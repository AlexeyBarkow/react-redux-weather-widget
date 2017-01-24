// import fetchSimplified from './fetch.simplified.js';
import axios from 'axios';

const DEFAULT_API_KEY = 'e370193d5122935a572140b76ba0a173';

function getWeatherTemplate(city, apiKey = DEFAULT_API_KEY) {
    return `api.openweathermap.org/data/2.5/weather?q=${city}&key=${DEFAULT_API_KEY}`;
}
const weatherAPI = {
    fetchWeather(city) {
        console.log(getWeatherTemplate(city))
        return axios.get(getWeatherTemplate(city));
    },
};

export default weatherAPI;
