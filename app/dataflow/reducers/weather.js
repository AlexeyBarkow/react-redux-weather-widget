import types from '../actions/types';

function weatherReducer(state, action) {
    switch (action.type) {
        case types.UPDATE_WEATHER_INFO:
        case types.SET_WEATHER_STATUS:
            return {
                ...state,
                weather: action.weather,
            };
        case types.UPDATE_FORECAST:
        case types.SET_FORECAST_STATUS:
            return {
                ...state,
                forecast: action.forecast,
            };
        case types.SET_FORECAST_FILTER:
            return {
                ...state,
                forecastFilter: action.forecastFilter,
            };
        default:
            return state;
    }
}

export default weatherReducer;
