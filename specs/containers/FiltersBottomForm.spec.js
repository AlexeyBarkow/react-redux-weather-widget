import React from 'react';
import { SubmissionError } from 'redux-form';
import { shallow } from 'enzyme';
import FiltersBottomWrapper from '../../app/containers/FiltersBottomWrapper';

describe('FiltersBottomWrapper', () => {
    describe('#submitAddToFav', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = shallow(
                <FiltersBottomWrapper
                  autocompleteCity={jest.fn()}
                  removeFromFavorites={jest.fn()}
                  getAllFavoritesWeather={jest.fn()}
                  changeFavoriteIndex={jest.fn()}
                  cache={{}}
                  addToFavoritesAndFetchWeather={jest.fn()}
                  favorites={[{ cityname: 'Testcity', countryCode: 'TS' }]}
                  metric="K"
                />);
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('should call addToFavoritesAndFetchWeather when new city is added', () => {
            const instance = wrapper.instance();
            instance.submitAddToFav({ tableCity: 'City, BY' });
            expect(instance.props.addToFavoritesAndFetchWeather).toHaveBeenCalledWith('City', 'BY');
        });
        it('should throw SubmissionError if city is already presented in favorites', () => {
            const instance = wrapper.instance();
            expect(() => instance.submitAddToFav({ tableCity: 'testcity, ts' })).toThrow(SubmissionError);
        });
    });
});
