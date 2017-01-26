import axios from 'axios';

const DEFAULT_API_KEY = 'e370193d5122935a572140b76ba0a173';
const API_URL = 'api.openweathermap.org/data/2.5';

function getWeatherTemplate(city, apiKey = DEFAULT_API_KEY) {
    return `${API_URL}/weather?q=${city}&key=${apiKey}`;
}

const weatherAPI = {
    fetchWeather(city) {
        return axios.get(getWeatherTemplate(city));
    },
};

export default weatherAPI;
