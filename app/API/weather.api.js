import fetchSimplified from './fetch.simplified.js';

const DEFAULT_API_KEY = 'e370193d5122935a572140b76ba0a173';

function getWeatherTemplate(city, apiKey = DEFAULT_API_KEY) {
    return `api.openweathermap.org/data/2.5/weather?q=${ city }`;
}
const weatherAPI = {
    fetchWeather: function(city) {
        console.log(getWeatherTemplate(city))
        return fetchSimplified.get(getWeatherTemplate(city));
    }
}

export default weatherAPI;
