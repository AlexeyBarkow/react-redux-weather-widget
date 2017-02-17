import axios, { CancelToken, isCancel } from 'axios';
import { DEFAULT_API_KEY, API_URL, ROSE_NAMES } from './constants';

function getMetricUrl(format) {
    let metric = '';

    if (format === 'C') {
        metric = '&units=metric';
    } else if (format === 'F') {
        metric = '&units=imperial';
    }

    return metric;
}

function getWeatherTemplate(city, countryCode, format = 'C', apiKey = DEFAULT_API_KEY) {
    return `${API_URL}/weather?q=${city},${countryCode}&APPID=${apiKey}${getMetricUrl(format)}`;
}

function getWeatherForecastTemplate(city, countryCode, format = 'C', apiKey = DEFAULT_API_KEY) {
    return `${API_URL}/forecast?q=${city},${countryCode}&APPID=${apiKey}${getMetricUrl(format)}`;
}

function mapWeatherType(type) {
    switch (type) {
        case 'Mist':
        case 'Clouds':
            return 'cloudy';
        case 'Rain':
            return 'rainy';
        case 'Clear':
            return 'clear';
        case 'Extreme':
            return 'thunder';
        case 'Snow':
            return 'snowy';
        case 'Haze':
            return 'haze';
        default:
            return 'default';
    }
}
//added for unification
function convertWeatherToAcceptableFormat(metric, city, status, data) {
    let formattedWeather;
    if ((data.cod || status) === 200) {
        formattedWeather = {
            metric,
            status: parseInt(data.cod, 10) || status,
            city: data.name || city,
            humidity: data.main.humidity,
            temperature: {
                curr: Math.trunc(data.main.temp),
                min: Math.trunc(data.main.temp_min),
                max: Math.trunc(data.main.temp_max),
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
            rain: data.rain ? Math.trunc(data.rain['3h'] * 100) : null,
            snow: data.snow ? Math.trunc(data.snow['3h'] * 100) : null,
            calculationTime: data.dt * 1000,
        };
    } else {
        formattedWeather = {
            status: data.cod,
            city: data.name,
            message: data.message,
        };
    }

    return formattedWeather;
}

let cancelWeatherAjax = null;
let cancelForecastAjax = null;

const weatherAPI = {
    fetchCurrentWeather(city, country, metric = 'C') {
        if (cancelWeatherAjax) {
            cancelWeatherAjax();
        }

        return axios
            .get(getWeatherTemplate(city, country, metric), {
                cancelToken: new CancelToken((cancel) => {
                    cancelWeatherAjax = cancel;
                }),
            })
            .then((res) => {
                cancelWeatherAjax = null;
                return convertWeatherToAcceptableFormat(metric, city, null, res.data);
            })
            .catch((error) => {
                if (isCancel(error)) {
                    return {
                        cod: -1,
                        message: 'another ajax sent',
                    };
                }
                return error;
            });
    },
    fetchWeatherForecast(city, country, metric = 'C') {
        if (cancelForecastAjax) {
            cancelForecastAjax();
        }

        const mapper = convertWeatherToAcceptableFormat.bind(null, metric, city, 200);
        return axios
            .get(getWeatherForecastTemplate(city, country, metric), {
                cancelToken: new CancelToken((cancel) => {
                    cancelForecastAjax = cancel;
                }),
            })
            .then((res) => {
                cancelForecastAjax = null;
                return res.data.list.map(mapper);
            })
            .catch((error) => {
                if (isCancel(error)) {
                    return {
                        cod: -1,
                        message: 'another ajax sent',
                    };
                }
                return error;
            });
    },
};

export default weatherAPI;

export function fromMetheoDirection(degree) {
    const angleInterval = 360 / ROSE_NAMES.length;

    return ROSE_NAMES[Math.trunc(((parseInt(degree, 10) % 360) / angleInterval) + .5)];
}
