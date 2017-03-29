import React, { Component, PropTypes } from 'react';
import { SubmissionError } from 'redux-form';
import AddCityForm from './AddCityForm';
import Favorites from '../components/Favorites';
import { VALIDATE_ADDRESS_REGEXP } from '../utils/constants';

class FiltersBottomWrapper extends Component {
    componentWillMount() {
        this.props.getAllFavoritesWeather();
    }

    submitAddToFav = ({ tableCity }) => {
        const { addToFavoritesAndFetchWeather, favorites } = this.props;
        if (tableCity) {
            let [cityname, countryCode] = tableCity.match(VALIDATE_ADDRESS_REGEXP).slice(1);
            cityname = cityname.charAt(0).toUpperCase() + cityname.slice(1).toLowerCase();
            countryCode = countryCode.toUpperCase();

            if (favorites.some(city =>
                cityname === city.cityname && countryCode === city.countryCode)) {
                throw new SubmissionError({ tableCity: 'Already added' });
            }
            addToFavoritesAndFetchWeather(cityname, countryCode);
        }
    };

    render() {
        const {
            autocompleteCity,
            autocomplete,
            metric,
            favorites,
            removeFromFavorites,
            cache,
            changeFavoriteIndex,
        } = this.props;

        return (
            <section className="panel col-xs-12">
                <h3>Favorite cities</h3>
                <AddCityForm
                  autocompleteCity={autocompleteCity}
                  autocomplete={autocomplete}
                  onSubmit={this.submitAddToFav}
                />
                <Favorites
                  info={cache}
                  metric={metric}
                  favorites={favorites}
                  removeHandler={removeFromFavorites}
                  changeFavoriteIndex={changeFavoriteIndex}
                />
            </section>
        );
    }
}

FiltersBottomWrapper.propTypes = {
    autocompleteCity: PropTypes.func.isRequired,
    autocomplete: PropTypes.array,
    metric: PropTypes.string.isRequired,
    favorites: PropTypes.array.isRequired,
    addToFavoritesAndFetchWeather: PropTypes.func.isRequired,
    removeFromFavorites: PropTypes.func.isRequired,
    getAllFavoritesWeather: PropTypes.func.isRequired,
    changeFavoriteIndex: PropTypes.func.isRequired,
    cache: PropTypes.object.isRequired,
};

FiltersBottomWrapper.defaultProps = {
    autocomplete: [],
};

export default FiltersBottomWrapper;
