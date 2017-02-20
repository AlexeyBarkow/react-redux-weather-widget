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
        case types.CACHE_PUSH: {
            const { cache } = state;
            const cacheKey = action.key || `${action.cache.city}/${action.cache.country}`;

            if (!cache[cacheKey]) {
                return {
                    ...state,
                    cache: {
                        ...cache,
                        [cacheKey]: action.cache,
                    },
                };
            }
            return state;
        }
        default:
            return state;
    }
}

export default weatherReducer;
