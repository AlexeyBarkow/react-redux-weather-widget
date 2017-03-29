export const GET_WEATHER_RESPONSE = {
    'coord': {
        'lon': 27.57,
        'lat': 53.9
    },
    'weather': [{
        'id': 701,
        'main': 'Mist',
        'description': 'mist',
        'icon': '50d'
    }],
    'base': 'stations',
    'main': {
        'temp': 6.01,
        'pressure': 1013,
        'humidity': 100,
        'temp_min': 5,
        'temp_max': 7
    },
    'visibility': 1500,
    'wind': {
        'speed': 2,
        'deg': 170
    },
    'clouds': {
        'all': 90
    },
    'dt': 1490167920,
    'sys': {
        'type': 1,
        'id': 7377,
        'message': 0.006,
        'country': 'BY',
        'sunrise': 1490155580,
        'sunset': 1490200057
    },
    'id': 625144,
    'name': 'Minsk',
    'cod': 200
};

export const GET_WEATHER_RESULT = {
    id: 625144,
    status: 200,
    city: 'Minsk',
    country: 'BY',
    humidity: 100,
    temperature: {
        curr: 6,
        min: 5,
        max: 7
    },
    location: {
        longitude: 27.57,
        latitude: 53.9
    },
    pressure: 1013,
    weatherTypes: [{
        main: 'haze',
        desc: 'mist',
        icon: '50d'
    }],
    clouds: 90,
    wind: {
        direction: 170,
        speed: 2
    },
    rain: null,
    snow: null,
    calculationTime: 1490167920000
};

export const GET_WEATHER_NOT_FOUND_RESPONSE = {
    'cod': '404',
    'message': 'city not found'
};

export const GET_CLOSEST_RESPONSE = {
    'message': 'accurate',
    'cod': '200',
    'count': 10,
    'list': [{
        'id': 2347078,
        'name': 'Birim',
        'coord': {
            'lat': 10.0621,
            'lon': 9.997
        },
        'main': {
            'temp': 38.02,
            'pressure': 966.34,
            'humidity': 23,
            'temp_min': 38.02,
            'temp_max': 38.02,
            'sea_level': 1019.89,
            'grnd_level': 966.34
        },
        'dt': 1490180197,
        'wind': {
            'speed': 1.97,
            'deg': 279.004
        },
        'sys': {
            'country': ''
        },
        'rain': null,
        'snow': null,
        'clouds': {
            'all': 0
        },
        'weather': [{
            'id': 800,
            'main': 'Clear',
            'description': 'Sky is Clear',
            'icon': '01d'
        }]
    }, {
        'id': 2318399,
        'name': 'Yamrat',
        'coord': {
            'lat': 10.1116,
            'lon': 9.826
        },
        'main': {
            'temp': 37.67,
            'pressure': 947.86,
            'humidity': 22,
            'temp_min': 37.67,
            'temp_max': 37.67,
            'sea_level': 1019.93,
            'grnd_level': 947.86
        },
        'dt': 1490180198,
        'wind': {
            'speed': 1.87,
            'deg': 320.004
        },
        'sys': {
            'country': ''
        },
        'rain': null,
        'snow': null,
        'clouds': {
            'all': 0
        },
        'weather': [{
            'id': 800,
            'main': 'Clear',
            'description': 'Sky is Clear',
            'icon': '01d'
        }]
    }, {
        'id': 2344804,
        'name': 'Dindima',
        'coord': {
            'lat': 10.2263,
            'lon': 10.1513
        },
        'main': {
            'temp': 38.02,
            'pressure': 966.34,
            'humidity': 23,
            'temp_min': 38.02,
            'temp_max': 38.02,
            'sea_level': 1019.89,
            'grnd_level': 966.34
        },
        'dt': 1490180198,
        'wind': {
            'speed': 1.97,
            'deg': 279.004
        },
        'sys': {
            'country': ''
        },
        'rain': null,
        'snow': null,
        'clouds': {
            'all': 0
        },
        'weather': [{
            'id': 800,
            'main': 'Clear',
            'description': 'Sky is Clear',
            'icon': '01d'
        }]
    }, {
        'id': 2347470,
        'name': 'Bauchi',
        'coord': {
            'lat': 10.3134,
            'lon': 9.8433
        },
        'main': {
            'temp': 37.67,
            'pressure': 947.86,
            'humidity': 22,
            'temp_min': 37.67,
            'temp_max': 37.67,
            'sea_level': 1019.93,
            'grnd_level': 947.86
        },
        'dt': 1490180198,
        'wind': {
            'speed': 1.87,
            'deg': 320.004
        },
        'sys': {
            'country': ''
        },
        'rain': null,
        'snow': null,
        'clouds': {
            'all': 0
        },
        'weather': [{
            'id': 800,
            'main': 'Clear',
            'description': 'Sky is Clear',
            'icon': '01d'
        }]
    }, {
        'id': 2346399,
        'name': 'Bununu Kasa',
        'coord': {
            'lat': 9.8681,
            'lon': 9.6628
        },
        'main': {
            'temp': 37.77,
            'pressure': 942.02,
            'humidity': 20,
            'temp_min': 37.77,
            'temp_max': 37.77,
            'sea_level': 1019.77,
            'grnd_level': 942.02
        },
        'dt': 1490180199,
        'wind': {
            'speed': 1.17,
            'deg': 308.004
        },
        'sys': {
            'country': ''
        },
        'rain': null,
        'snow': null,
        'clouds': {
            'all': 0
        },
        'weather': [{
            'id': 800,
            'main': 'Clear',
            'description': 'Sky is Clear',
            'icon': '01d'
        }]
    }, {
        'id': 2339789,
        'name': 'Gwaram',
        'coord': {
            'lat': 10.233,
            'lon': 10.2857
        },
        'main': {
            'temp': 38.02,
            'pressure': 966.34,
            'humidity': 23,
            'temp_min': 38.02,
            'temp_max': 38.02,
            'sea_level': 1019.89,
            'grnd_level': 966.34
        },
        'dt': 1490180199,
        'wind': {
            'speed': 1.97,
            'deg': 279.004
        },
        'sys': {
            'country': ''
        },
        'rain': null,
        'snow': null,
        'clouds': {
            'all': 0
        },
        'weather': [{
            'id': 800,
            'main': 'Clear',
            'description': 'Sky is Clear',
            'icon': '01d'
        }]
    }, {
        'id': 2317982,
        'name': 'Yuli',
        'coord': {
            'lat': 9.6989,
            'lon': 10.2744
        },
        'main': {
            'temp': 38.92,
            'pressure': 968.77,
            'humidity': 24,
            'temp_min': 38.92,
            'temp_max': 38.92,
            'sea_level': 1019.6,
            'grnd_level': 968.77
        },
        'dt': 1490180199,
        'wind': {
            'speed': 2.82,
            'deg': 238.504
        },
        'sys': {
            'country': ''
        },
        'rain': null,
        'snow': null,
        'clouds': {
            'all': 0
        },
        'weather': [{
            'id': 800,
            'main': 'Clear',
            'description': 'Sky is Clear',
            'icon': '01d'
        }]
    }, {
        'id': 2346401,
        'name': 'Bununu Dass',
        'coord': {
            'lat': 10,
            'lon': 9.5167
        },
        'main': {
            'temp': 37.67,
            'pressure': 947.86,
            'humidity': 22,
            'temp_min': 37.67,
            'temp_max': 37.67,
            'sea_level': 1019.93,
            'grnd_level': 947.86
        },
        'dt': 1490180199,
        'wind': {
            'speed': 1.87,
            'deg': 320.004
        },
        'sys': {
            'country': ''
        },
        'rain': null,
        'snow': null,
        'clouds': {
            'all': 0
        },
        'weather': [{
            'id': 800,
            'main': 'Clear',
            'description': 'Sky is Clear',
            'icon': '01d'
        }]
    }, {
        'id': 2347468,
        'name': 'Bauchi State',
        'coord': {
            'lat': 10.5,
            'lon': 10
        },
        'main': {
            'temp': 38.77,
            'pressure': 965.61,
            'humidity': 19,
            'temp_min': 38.77,
            'temp_max': 38.77,
            'sea_level': 1019.97,
            'grnd_level': 965.61
        },
        'dt': 1490180199,
        'wind': {
            'speed': 2.02,
            'deg': 297.504
        },
        'sys': {
            'country': ''
        },
        'rain': null,
        'snow': null,
        'clouds': {
            'all': 0
        },
        'weather': [{
            'id': 800,
            'main': 'Clear',
            'description': 'Sky is Clear',
            'icon': '01d'
        }]
    }, {
        'id': 2348389,
        'name': 'Badakoshi',
        'coord': {
            'lat': 10.5465,
            'lon': 10.0119
        },
        'main': {
            'temp': 38.77,
            'pressure': 965.61,
            'humidity': 19,
            'temp_min': 38.77,
            'temp_max': 38.77,
            'sea_level': 1019.97,
            'grnd_level': 965.61
        },
        'dt': 1490180199,
        'wind': {
            'speed': 2.02,
            'deg': 297.504
        },
        'sys': {
            'country': ''
        },
        'rain': null,
        'snow': null,
        'clouds': {
            'all': 0
        },
        'weather': [{
            'id': 800,
            'main': 'Clear',
            'description': 'Sky is Clear',
            'icon': '01d'
        }]
    }]
};

export const GET_CLOSEST_RESULT = [{
    'id': 2347078,
    'status': 200,
    'city': 'Birim',
    'country': 'any',
    'humidity': 23,
    'temperature': {
        'curr': 38,
        'min': 38,
        'max': 38
    },
    'location': {
        'longitude': 9.997,
        'latitude': 10.0621
    },
    'pressure': 966.34,
    'weatherTypes': [{
        'main': 'clear',
        'desc': 'Sky is Clear',
        'icon': '01d'
    }],
    'clouds': 0,
    'wind': {
        'direction': 279.004,
        'speed': 1.97
    },
    'rain': null,
    'snow': null,
    'calculationTime': 1490180197000
}, {
    'id': 2318399,
    'status': 200,
    'city': 'Yamrat',
    'country': 'any',
    'humidity': 22,
    'temperature': {
        'curr': 38,
        'min': 38,
        'max': 38
    },
    'location': {
        'longitude': 9.826,
        'latitude': 10.1116
    },
    'pressure': 947.86,
    'weatherTypes': [{
        'main': 'clear',
        'desc': 'Sky is Clear',
        'icon': '01d'
    }],
    'clouds': 0,
    'wind': {
        'direction': 320.004,
        'speed': 1.87
    },
    'rain': null,
    'snow': null,
    'calculationTime': 1490180198000
}, {
    'id': 2344804,
    'status': 200,
    'city': 'Dindima',
    'country': 'any',
    'humidity': 23,
    'temperature': {
        'curr': 38,
        'min': 38,
        'max': 38
    },
    'location': {
        'longitude': 10.1513,
        'latitude': 10.2263
    },
    'pressure': 966.34,
    'weatherTypes': [{
        'main': 'clear',
        'desc': 'Sky is Clear',
        'icon': '01d'
    }],
    'clouds': 0,
    'wind': {
        'direction': 279.004,
        'speed': 1.97
    },
    'rain': null,
    'snow': null,
    'calculationTime': 1490180198000
}, {
    'id': 2347470,
    'status': 200,
    'city': 'Bauchi',
    'country': 'any',
    'humidity': 22,
    'temperature': {
        'curr': 38,
        'min': 38,
        'max': 38
    },
    'location': {
        'longitude': 9.8433,
        'latitude': 10.3134
    },
    'pressure': 947.86,
    'weatherTypes': [{
        'main': 'clear',
        'desc': 'Sky is Clear',
        'icon': '01d'
    }],
    'clouds': 0,
    'wind': {
        'direction': 320.004,
        'speed': 1.87
    },
    'rain': null,
    'snow': null,
    'calculationTime': 1490180198000
}, {
    'id': 2346399,
    'status': 200,
    'city': 'Bununu Kasa',
    'country': 'any',
    'humidity': 20,
    'temperature': {
        'curr': 38,
        'min': 38,
        'max': 38
    },
    'location': {
        'longitude': 9.6628,
        'latitude': 9.8681
    },
    'pressure': 942.02,
    'weatherTypes': [{
        'main': 'clear',
        'desc': 'Sky is Clear',
        'icon': '01d'
    }],
    'clouds': 0,
    'wind': {
        'direction': 308.004,
        'speed': 1.17
    },
    'rain': null,
    'snow': null,
    'calculationTime': 1490180199000
}, {
    'id': 2339789,
    'status': 200,
    'city': 'Gwaram',
    'country': 'any',
    'humidity': 23,
    'temperature': {
        'curr': 38,
        'min': 38,
        'max': 38
    },
    'location': {
        'longitude': 10.2857,
        'latitude': 10.233
    },
    'pressure': 966.34,
    'weatherTypes': [{
        'main': 'clear',
        'desc': 'Sky is Clear',
        'icon': '01d'
    }],
    'clouds': 0,
    'wind': {
        'direction': 279.004,
        'speed': 1.97
    },
    'rain': null,
    'snow': null,
    'calculationTime': 1490180199000
}, {
    'id': 2317982,
    'status': 200,
    'city': 'Yuli',
    'country': 'any',
    'humidity': 24,
    'temperature': {
        'curr': 39,
        'min': 39,
        'max': 39
    },
    'location': {
        'longitude': 10.2744,
        'latitude': 9.6989
    },
    'pressure': 968.77,
    'weatherTypes': [{
        'main': 'clear',
        'desc': 'Sky is Clear',
        'icon': '01d'
    }],
    'clouds': 0,
    'wind': {
        'direction': 238.504,
        'speed': 2.82
    },
    'rain': null,
    'snow': null,
    'calculationTime': 1490180199000
}, {
    'id': 2346401,
    'status': 200,
    'city': 'Bununu Dass',
    'country': 'any',
    'humidity': 22,
    'temperature': {
        'curr': 38,
        'min': 38,
        'max': 38
    },
    'location': {
        'longitude': 9.5167,
        'latitude': 10
    },
    'pressure': 947.86,
    'weatherTypes': [{
        'main': 'clear',
        'desc': 'Sky is Clear',
        'icon': '01d'
    }],
    'clouds': 0,
    'wind': {
        'direction': 320.004,
        'speed': 1.87
    },
    'rain': null,
    'snow': null,
    'calculationTime': 1490180199000
}, {
    'id': 2347468,
    'status': 200,
    'city': 'Bauchi State',
    'country': 'any',
    'humidity': 19,
    'temperature': {
        'curr': 39,
        'min': 39,
        'max': 39
    },
    'location': {
        'longitude': 10,
        'latitude': 10.5
    },
    'pressure': 965.61,
    'weatherTypes': [{
        'main': 'clear',
        'desc': 'Sky is Clear',
        'icon': '01d'
    }],
    'clouds': 0,
    'wind': {
        'direction': 297.504,
        'speed': 2.02
    },
    'rain': null,
    'snow': null,
    'calculationTime': 1490180199000
}, {
    'id': 2348389,
    'status': 200,
    'city': 'Badakoshi',
    'country': 'any',
    'humidity': 19,
    'temperature': {
        'curr': 39,
        'min': 39,
        'max': 39
    },
    'location': {
        'longitude': 10.0119,
        'latitude': 10.5465
    },
    'pressure': 965.61,
    'weatherTypes': [{
        'main': 'clear',
        'desc': 'Sky is Clear',
        'icon': '01d'
    }],
    'clouds': 0,
    'wind': {
        'direction': 297.504,
        'speed': 2.02
    },
    'rain': null,
    'snow': null,
    'calculationTime': 1490180199000
}];
