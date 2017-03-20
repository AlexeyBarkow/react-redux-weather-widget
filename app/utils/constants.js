export const BASEPATH_URL = 'http://epam.2i.by/barkou';

export const IMAGES_BASE_PATH = 'http://openweathermap.org/img/w/';
export const IMAGES_UNUSUAL_PATH = 'http://epam.2i.by/barkou/images/';
export const WEATHER_API_URL = 'https://openweathermap.org/api';
export const FORECAST_INTERVAL = 3600000 * 3;
export const MIN_AJAX_INTERVAL = 500;
export const DEFAULT_METRIC = 'C';

export const USERNAME = 'aliaksei_barkou';
export const GEONAMES_API_URL = 'http://ws.geonames.org';
export const GEONAMES_SITE_URL = 'http://www.geonames.org/';
export const MAX_ROWS = 10;

export const GOOGLE_MAP_API_KEY = 'AIzaSyCOPA2wyfe0T9xSeRxTDs1Jz7B38s1hiUM';
export const GOOGLE_MAP_API_BASE = 'https://maps.googleapis.com/maps/api';
export const GOOGLE_MAP_SITE_URL = 'https://developers.google.com/maps/documentation/javascript';

export const DEFAULT_API_KEY = '1c11f4e7692bb5e0526e72c0e6baaa3b';
export const API_URL = 'http://api.openweathermap.org/data/2.5';

export const VALIDATE_ADDRESS_REGEXP = /^([a-zA-Z-\s']+),\s([a-zA-Z]{1,3})$/;
export const VALIDATE_TEMPERATURE_REGEXP = /^([0-9]|-?[1-9][0-9]{0,2})$/;
export const VALIDATE_PRESSURE_REGEXP = /^([0-9]|[1-9][0-9]{0,3})$/;
export const VALIDATE_SPEED_REGEXP = /^([0-9]|[1-9][0-9]{0,2})$/;
export const VALIDATE_HUMIDITY_REGEXP = /^([0-9]|[1-9][0-9]{0,2})$/;
export const CITY_PATH_REGEXP = /^\/cities\/([a-zA-Z]{1,3})\/([a-zA-Z\s-'’а-яА-ЯёëЁ]*)$/;
export const DEFAULT_PATH_REGEXP = /^\/(|home)$/;
export const MATCH_DATES_REGEXP = /^([\d]{2}).([\d]{2}).([\d]{4})$/;

export const ACCEPTABLE_METRICS_REGEXP = /^[cCfFkK]$/;

export const REACT_URL = 'https://facebook.github.io/react/';
export const REDUX_URL = 'http://redux.js.org';

export const ROOT_NODE = document.getElementById('root');
export const ROSE_NAMES = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

export const WEATHER_ICON_TYPES_MAP = {
    'i01': 'clear sky',
    'i02': 'few clouds',
    'i03': 'scattered clouds',
    'i04': 'broken clouds',
    'i09': 'shower rain',
    'i10': 'rain',
    'i11': 'thunderstorm',
    'i13': 'snow',
    'i50': 'mist',
};

export const DEFAULT_COUNTRY_CODE = 'any';

export const DEFAULT_TOOLTIP_TYPE = 'default';
export const WEEK_DAY_NAMES = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
];
export const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
];
