import axios, { CancelToken, isCancel } from 'axios';
import { DEFAULT_API_KEY, API_URL, ROSE_NAMES, DEFAULT_METRIC, MAX_ROWS, DEFAULT_COUNTRY_CODE } from './constants';

function fromCelsiumToKelvin(value) {
    return value + 273;
}

function fromFahrenheitToKelvin(value) {
    return ((value + 459.67) * 5) / 9;
}

function fromKelvinToCelsium(value) {
    return value - 273;
}

function fromKelvinToFahrenheit(value) {
    return ((value * 9) / 5) - 459.67;
}

function getMetricUrl(format) {
    let metric = '';

    if (format === 'C') {
        metric = '&units=metric';
    } else if (format === 'F') {
        metric = '&units=imperial';
    }

    return metric;
}

function getWeatherTemplate(
    city,
    countryCode,
    format = DEFAULT_METRIC,
    apiKey = DEFAULT_API_KEY,
) {
    return `${API_URL}/weather?q=${city}${
        countryCode && countryCode !== DEFAULT_COUNTRY_CODE
        ? `,${countryCode}`
        : ''
    }&APPID=${apiKey}${getMetricUrl(format)}`;
}

function getWeatherForecastTemplate(
    city,
    countryCode,
    format = DEFAULT_METRIC,
    apiKey = DEFAULT_API_KEY,
) {
    return `${API_URL}/forecast?q=${city}${
        countryCode && countryCode !== DEFAULT_COUNTRY_CODE
        ? `,${countryCode}`
        : ''
    }&APPID=${apiKey}${getMetricUrl(format)}`;
}

function getClosestCitiesToLocationURL(
    { longitude, latitude },
    resultRows = MAX_ROWS,
    format = DEFAULT_METRIC,
    apiKey = DEFAULT_API_KEY,
) {
    return `${API_URL}/find?lat=${latitude}&lon=${longitude}&cnt=${resultRows}&APPID=${apiKey}${getMetricUrl(format)}`;
}

function getWeatherByLocationURL(
    { latitude, longitude },
    format = DEFAULT_METRIC,
    apiKey = DEFAULT_API_KEY,
) {
    return `${API_URL}/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}${getMetricUrl(format)}`;
}

function getForecastByLocationURL(
    { latitude, longitude },
    format = DEFAULT_METRIC,
    apiKey = DEFAULT_API_KEY,
) {
    return `${API_URL}/forecast?lat=${latitude}&lon=${longitude}&APPID=${apiKey}${getMetricUrl(format)}`;
}

function mapWeatherType(type) {
    switch (type) {
        case 'Clouds':
            return 'cloudy';
        case 'Rain':
        case 'Drizzle':
            return 'rainy';
        case 'Clear':
            return 'clear';
        case 'Extreme':
            return 'thunder';
        case 'Snow':
            return 'snowy';
        case 'Haze':
        case 'Mist':
            return 'haze';
        default:
            return 'default';
    }
}
//added for unification
function convertWeatherToAcceptableFormat(city, country, status, data) {
    let formattedWeather;
    if ((data.cod || status) === 200) {
        formattedWeather = {
            id: data.id || '-1',
            status: parseInt(data.cod, 10) || status,
            city: data.name || city,
            country: data.sys.country || country || DEFAULT_COUNTRY_CODE,
            humidity: data.main.humidity,
            temperature: {
                curr: Math.round(data.main.temp),
                min: Math.round(data.main.temp_min),
                max: Math.round(data.main.temp_max),
            },
            location: data.coord ? {
                longitude: data.coord.lon,
                latitude: data.coord.lat,
            } : null,
            pressure: data.main.pressure,
            weatherTypes: data.weather.map(curr => ({
                main: mapWeatherType(curr.main),
                desc: curr.description,
                icon: curr.icon,
            })),
            clouds: data.clouds.all,
            wind: {
                direction: data.wind.deg,
                speed: data.wind.speed,
            },
            rain: data.rain && data.rain['3h'] ? Math.trunc(data.rain['3h'] * 100) / 100 : null,
            snow: data.snow && data.snow['3h'] ? Math.trunc(data.snow['3h'] * 100) / 100 : null,
            calculationTime: data.dt * 1000,
        };
    } else {
        formattedWeather = {
            status: data.cod,
            city: city || data.name,
            message: data.message,
        };
    }

    return formattedWeather;
}

function weatherFetchInit(getTemplateUrl, onFetch, onError, sliceTemplateArgs) {
    const cancelAjaxTokens = {};

    return (...args) => {
        const argsKey = JSON.stringify(args);
        if (cancelAjaxTokens[argsKey]) {
            cancelAjaxTokens[argsKey]();
        }

        return axios
        .get(getTemplateUrl(...args.slice(0, sliceTemplateArgs || args.length)), {
            cancelToken: new CancelToken((cancel) => {
                cancelAjaxTokens[argsKey] = cancel;
            }),
        })
        .then((res) => {
            cancelAjaxTokens[argsKey] = null;
            return onFetch(res, ...args);
        })
        .catch((error) => {
            if (isCancel(error)) {
                return {
                    cod: -1,
                    message: 'another ajax sent',
                };
            }
            return onError ? onError(error, ...args) : error;
        });
    };
}

function returnConvertedForecast(response, city, country) {
    const converter = convertWeatherToAcceptableFormat
    .bind(null, city, country, 200);
    let result;
    if (response.data.list) {
        result = response.data.list.map(converter);
        result.status = parseInt(response.data.cod, 10);
    } else {
        result = [converter(response.data)];
    }
    return result;
}

const weatherAPI = {
    fetchCurrentWeather: weatherFetchInit(
        getWeatherTemplate,
        (res, city) => convertWeatherToAcceptableFormat(city, null, null, res.data),
    ),
    fetchWeatherForecast: weatherFetchInit(
        getWeatherForecastTemplate,
        returnConvertedForecast,
    ),
    getClosestCitiesToLocation: weatherFetchInit(
        getClosestCitiesToLocationURL,
        res => res.data.list.map(convertWeatherToAcceptableFormat.bind(null, null, null, 200)),
    ),
    getWeatherInfoByLocation: weatherFetchInit(
        getWeatherByLocationURL,
        res => convertWeatherToAcceptableFormat(null, null, null, res.data),
        undefined,
        1,
    ),
    getForecastInfoByLocation: weatherFetchInit(
        getForecastByLocationURL,
        (res, _, city) =>
            returnConvertedForecast(res, city, DEFAULT_COUNTRY_CODE),
        undefined,
        1,
    ),
};

export default weatherAPI;

export function fromMetheoDirection(degree) {
    const angleInterval = 360 / ROSE_NAMES.length;

    return ROSE_NAMES[Math.trunc(((parseInt(degree, 10) + 11.25) % 360) / angleInterval)];
}

export function convertValueToMetric(value, metric, prevMetric = DEFAULT_METRIC) {
    if (prevMetric === metric) {
        return value;
    }

    let valueInKelvin;
    if (prevMetric === 'C') {
        valueInKelvin = fromCelsiumToKelvin(value);
    } else if (prevMetric === 'F') {
        valueInKelvin = fromFahrenheitToKelvin(value);
    } else {
        valueInKelvin = value;
    }

    let result = valueInKelvin;
    if (metric === 'C') {
        result = fromKelvinToCelsium(valueInKelvin);
    } else if (metric === 'F') {
        result = fromKelvinToFahrenheit(valueInKelvin);
    }

    return Math.round(result);
}
