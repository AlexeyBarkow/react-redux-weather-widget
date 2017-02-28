import React, { Component, PropTypes } from 'react';
import AddCityForm from './AddCityForm';
import Favorites from '../components/Favorites';

class FiltersBottomWrapper extends Component {
    render() {
        const { autocompleteCity, autocomplete, metric, favorites } = this.props;
        return (
            <section className="panel col-xs-12">
                <h3>Cities to filter</h3>
                <AddCityForm autocompleteCity={autocompleteCity} autocomplete={autocomplete} />
                <Favorites metric={metric} favorites={favorites} />
            </section>
        );
    }
}

FiltersBottomWrapper.propTypes = {
    autocompleteCity: PropTypes.func.isRequired,
    autocomplete: PropTypes.array,
    metric: PropTypes.string.isRequired,
    favorites: PropTypes.array.isRequired,
};

FiltersBottomWrapper.defaultProps = {
    autocomplete: [],
};

export default FiltersBottomWrapper;
