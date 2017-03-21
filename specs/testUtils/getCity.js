export const GET_CITY_RESPONSE = {
    'geonames': [{
        'lng': 9.843883,
        'geonameId': 2347470,
        'countrycode': 'NG',
        'name': 'Bauchi',
        'fclName': 'city, village,...',
        'toponymName': 'Bauchi',
        'fcodeName': 'seat of a first-order administrative division',
        'wikipedia': 'en.wikipedia.org/wiki/Bauchi',
        'lat': 10.310321,
        'fcl': 'P',
        'population': 316149,
        'fcode': 'PPLA',
    }, {
        'lng': 10.151323,
        'geonameId': 2344804,
        'countrycode': 'NG',
        'name': 'Dindima',
        'fclName': 'city, village,...',
        'toponymName': 'Dindima',
        'fcodeName': 'populated place',
        'wikipedia': '',
        'lat': 10.22629,
        'fcl': 'P',
        'population': 13356,
        'fcode': 'PPL',
    }],
}

export const GET_CITY_EXPECTED_RESULT = [{
        countryCode: 'NG',
        name: 'Bauchi',
    },
    {
        countryCode: 'NG',
        name: 'Dindima',
    },
];

export const GET_CITY_BY_NAME = {
    'totalResultsCount': 3242,
    'geonames': [{
        'lng': '-122.76375',
        'geonameId': 5797582,
        'countryCode': 'US',
        'name': 'Home',
        'toponymName': 'Home',
        'lat': '47.27482',
        'fcl': 'P',
        'fcode': 'PPL'
    }, {
        'lng': '-96.51974',
        'geonameId': 4273127,
        'countryCode': 'US',
        'name': 'Home',
        'toponymName': 'Home',
        'lat': '39.84167',
        'fcl': 'P',
        'fcode': 'PPL'
    }, {
        'lng': '-79.10531',
        'geonameId': 5194049,
        'countryCode': 'US',
        'name': 'Home',
        'toponymName': 'Home',
        'lat': '40.73951',
        'fcl': 'P',
        'fcode': 'PPL'
    }, {
        'lng': '-80.81316',
        'geonameId': 4829378,
        'countryCode': 'US',
        'name': 'Home',
        'toponymName': 'Home',
        'lat': '38.72565',
        'fcl': 'P',
        'fcode': 'PPL'
    }, {
        'lng': '126.93751',
        'geonameId': 11351026,
        'countryCode': 'TL',
        'name': 'Home',
        'toponymName': 'Home',
        'lat': '-8.49027',
        'fcl': 'A',
        'fcode': 'ADM3'
    }, {
        'lng': '1.05002',
        'geonameId': 2300364,
        'countryCode': 'GH',
        'name': 'Home',
        'toponymName': 'Home',
        'lat': '6.11908',
        'fcl': 'P',
        'fcode': 'PPL'
    }, {
        'lng': '126.96528',
        'geonameId': 1942804,
        'countryCode': 'TL',
        'name': 'Home',
        'toponymName': 'Home',
        'lat': '-8.49917',
        'fcl': 'P',
        'fcode': 'PPL'
    }, {
        'lng': '30.9754',
        'geonameId': 627907,
        'countryCode': 'BY',
        'name': 'Homel',
        'toponymName': 'Gomel',
        'lat': '52.4345',
        'fcl': 'P',
        'fcode': 'PPLA'
    }, {
        'lng': '-76.17882',
        'geonameId': 5121169,
        'countryCode': 'US',
        'name': 'Homer',
        'toponymName': 'Homer',
        'lat': '42.63701',
        'fcl': 'P',
        'fcode': 'PPL'
    }, {
        'lng': '-84.80886',
        'geonameId': 4996369,
        'countryCode': 'US',
        'name': 'Homer',
        'toponymName': 'Homer',
        'lat': '42.14588',
        'fcl': 'P',
        'fcode': 'PPL'
    }]
}

export const GET_CITY_BY_NAME_RESULT = [{
    'countryCode': 'US',
    'name': 'Home'
}, {
    'countryCode': 'US',
    'name': 'Home'
}, {
    'countryCode': 'US',
    'name': 'Home'
}, {
    'countryCode': 'US',
    'name': 'Home'
}, {
    'countryCode': 'TL',
    'name': 'Home'
}, {
    'countryCode': 'GH',
    'name': 'Home'
}, {
    'countryCode': 'TL',
    'name': 'Home'
}, {
    'countryCode': 'BY',
    'name': 'Homel'
}, {
    'countryCode': 'US',
    'name': 'Homer'
}, {
    'countryCode': 'US',
    'name': 'Homer'
}]
