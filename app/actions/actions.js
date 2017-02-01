import * as types from './types';
import getWeatherAjax from '../utils/weatherAPI';
import loadLocation from '../utils/geolocationAPI';

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

export function changeLocation(location) {
    return {
        type: types.UPDATE_LOCATION,
        location,
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

export function getLocation() {
    return (dispatch) => {
        loadLocation.then((location) => {
            dispatch(changeLocation(location));
        });
    };
}

// const dispatchers = {
//     changeCity,
//     changeWeatherInfo,
//     getWeather,
// };

// export default dispatchers;
