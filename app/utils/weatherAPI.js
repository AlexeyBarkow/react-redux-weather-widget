import axios from 'axios';
import { DEFAULT_API_KEY, API_URL } from './constants';

function getWeatherTemplate(city, countryCode, format = 'C', apiKey = DEFAULT_API_KEY) {
    let metric;

    if (format === 'C') {
        metric = 'metric';
    } else if (format === 'F') {
        metric = 'imperial';
    }

    return `${API_URL}/weather?q=${city},${countryCode}&APPID=${apiKey}&units=${metric}`;
}

function getWeatherForecastTemplate(city, countryCode, format = 'C', apiKey = DEFAULT_API_KEY) {
    let metric;

    if (format === 'C') {
        metric = 'metric';
    } else if (format === 'F') {
        metric = 'imperial';
    }

    return `${API_URL}/forecast?q=${city},${countryCode}&APPID=${apiKey}&units=${metric}`;
}

function mapWeatherType(type) {
    switch (type) {
        case 'Mist':
        case 'Clouds':
            return 'cloudy';
        case 'Rain':
            return 'rainy';
        case 'Clear':
            return 'cloudy';
        case 'Extreme':
            return 'thunder';
        case 'Snow':
            return 'snowy';
        default:
            return '';
    }
}
//added for unification
function convertWeatherToAcceptableFormat(metric, city, status, data) {
    let formattedWeather;
    if ((data.cod || status) === 200) {
        formattedWeather = {
            metric,
            status: data.cod || status,
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
                direction: data.wind.dir,
                speed: data.wind.speed,
            },
            rain: data.rain ? data.rain['3h'] : null,
            snow: data.snow ? data.snow['3h'] : null,
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

const weatherAPI = {
    fetchCurrentWeather(city, country, metric = 'C') {
        return axios
            .get(getWeatherTemplate(city, country, metric))
            .then(res => convertWeatherToAcceptableFormat(metric, city, null, res.data))
            .catch(error => ({
                status: error.cod,
                message: error.message,
            }));
    },
    fetchWeatherForecast(city, country, metric = 'C') {
        const mapper = convertWeatherToAcceptableFormat.bind(null, metric, city, 200);
        return axios
            .get(getWeatherForecastTemplate(city, country, metric))
            .then(res => res.data.list.map(mapper)).catch(error => ([{
                status: error.cod,
                message: error.message,
            }]));
    },
};

export default weatherAPI;
