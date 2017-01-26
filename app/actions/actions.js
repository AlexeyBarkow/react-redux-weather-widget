import * as types from './types';
import getWeatherAjax from '../utils/weatherAPI';


export function changeCity(city) {
    return {
        type: types.SET_CITY,
        city,
    };
}

export function changeWeatherInfo(weather) {
    return {
        type: types.UPDATE_WEATHER_INFO,
        weather,
    };
}

export function getWeather(city) {
    return (dispatch) => {
        getWeatherAjax(city)
          .then((data) => {
              dispatch(changeWeatherInfo(data));
          });
    };
}

// const dispatchers = {
//     changeCity,
//     changeWeatherInfo,
//     getWeather,
// };

// export default dispatchers;
