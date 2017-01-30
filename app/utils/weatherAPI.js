import axios from 'axios';

const DEFAULT_API_KEY = 'e370193d5122935a572140b76ba0a173';
const API_URL = 'http://api.openweathermap.org/data/2.5';

function getWeatherTemplate(city, format = 'C', apiKey = DEFAULT_API_KEY) {
    let metric;

    if (format === 'C') {
        metric = 'metric';
    } else if (format === 'F') {
        metric = 'imperial';
    }

    return `${API_URL}/weather?q=${city}&APPID=${apiKey}&units=${metric}`;
}

function getWeatherForecastTemplate(city, format = 'C', apiKey = DEFAULT_API_KEY) {
    let metric;

    if (format === 'C') {
        metric = 'metric';
    } else if (format === 'F') {
        metric = 'imperial';
    }

    return `${API_URL}/forecast?q=${city}&APPID=${apiKey}&units=${metric}`;
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
function convertWeatherToAcceptableFormat(metric, city, cod, data) {
    let formattedWeather;
    if ((data.cod || cod) === 200) {
        formattedWeather = {
            metric,
            status: data.cod || cod,
            city: data.name || city,
            humidity: data.main.humidity,
            temperature: {
                curr: Math.trunc(data.main.temp),
                min: Math.trunc(data.main.temp_min),
                max: Math.trunc(data.main.temp_max),
            },
            pressure: data.main.pressure,
            weatherTypes: data.weather.map(curr => ({
                main: mapWeatherType(curr.main),
                desc: curr.description,
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
    fetchCurrentWeather(city, metric = 'C') {
        return axios
            .get(getWeatherTemplate(city, metric))
            .then(res => convertWeatherToAcceptableFormat(metric, city, null, res));
    },
    fetchWeatherForecast(city, metric = 'c') {
        const mapper = convertWeatherToAcceptableFormat.bind(null, metric, city, 200);
        return axios
            .get(getWeatherForecastTemplate(city, metric))
            .then(res => res.data.list.map(mapper));
    },
};

weatherAPI.fetchWeatherForecast('Minsk');

export default weatherAPI;
