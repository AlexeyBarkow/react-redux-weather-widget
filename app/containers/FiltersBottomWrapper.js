import React, { Component, PropTypes } from 'react';
import AddCityForm from './AddCityForm';
import Favorites from '../components/Favorites';
import { VALIDATE_ADDRESS_REGEXP } from '../utils/constants';

class FiltersBottomWrapper extends Component {
    componentWillMount() {
        console.log('wat')
        this.props.getAllFavoritesWeather();
    }

    submitAddToFav = ({ tableCity }) => {
        const { addToFavoritesAndFetchWeather } = this.props;
        const [cityname, countryCode] = tableCity.match(VALIDATE_ADDRESS_REGEXP).slice(1);
        addToFavoritesAndFetchWeather(cityname, countryCode);
    };

    render() {
        const {
            autocompleteCity,
            autocomplete,
            metric,
            favorites,
            removeFromFavorites,
        } = this.props;

        return (
            <section className="panel col-xs-12">
                <h3>Cities to filter</h3>
                <AddCityForm
                  autocompleteCity={autocompleteCity}
                  autocomplete={autocomplete}
                  onSubmit={this.submitAddToFav}
                />
                <Favorites
                  metric={metric}
                  favorites={favorites}
                  removeHandler={removeFromFavorites}
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
};

FiltersBottomWrapper.defaultProps = {
    autocomplete: [],
};

export default FiltersBottomWrapper;
