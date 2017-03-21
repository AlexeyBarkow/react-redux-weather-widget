import axios from 'axios';
import getCityAPI from '../../app/utils/getCityAPI';
import { GET_CITY_EXPECTED_RESULT, GET_CITY_RESPONSE, GET_CITY_BY_NAME, GET_CITY_BY_NAME_RESULT } from '../testUtils/getCity';

jest.mock('axios');

describe('getCityAPI.js', () => {
    beforeAll(() => {
        const getClosestCitiesToLocationUrl = 'http://ws.geonames.org/citiesJSON?north=9.5&south=10.5&west=9.5&east=10.5&username=aliaksei_barkou&maxRows=10&style=SHORT&radius=0.5';
        const getCitiesByNameUrl = 'http://ws.geonames.org/searchJSON?name_startsWith=home&username=aliaksei_barkou&maxRows=10&style=SHORT';

        axios.get.mockImplementation(
            url => new Promise((res, rej) => {
                if (url === getClosestCitiesToLocationUrl) {
                    res({ data: GET_CITY_RESPONSE });
                } else if (url === getCitiesByNameUrl) {
                    res({ data: GET_CITY_BY_NAME });
                } else {
                    rej({ message: `unexpected url: ${url}` });
                }
            }),
        );
    });

    afterEach(() => {
        axios.get.mockClear();
    });

    afterAll(() => {
        axios.get.mockReset();
    });

    describe('#getClosestCitiesToLocation', () => {
        it('should select proper info from response', () =>
            getCityAPI.getClosestCitiesToLocation({ latitude: 10, longitude: 10 })
            .then((res) => {
                expect(res).toEqual(GET_CITY_EXPECTED_RESULT);
            }),
        );
    });

    describe('#getCityAjax', () => {
        it('should not send an ajax request when cityname start is empty', () =>
            getCityAPI.getCityAjax('').then(() => {
                expect(axios.get.mock.calls.length).toBe(0);
            }),
        );

        it('should not send an ajax request when cityname is less than 3', () =>
            getCityAPI.getCityAjax('qw').then(() => {
                expect(axios.get.mock.calls.length).toBe(0);
            }),
        );

        it('should return cities list when cityname is larger than 3 symbols', () =>
            getCityAPI.getCityAjax('home').then((res) => {
                expect(res).toEqual(GET_CITY_BY_NAME_RESULT);
            }),
        );
    });
});
