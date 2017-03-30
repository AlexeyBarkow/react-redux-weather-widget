import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FiltersBottomWrapper from '../FiltersBottomWrapper';
import {
    autocompleteCity,
    addToFavoritesAndFetchWeather,
    removeFromFavorites,
    getAllFavoritesWeather,
    changeFavoriteIndex,
    reset,
} from '../../dataflow/actions';
import { selectFavoriteCache } from '../../selectors';

function mapStateToProps(state) {
    const {
        main: { autocomplete, metric },
        favorites: { favoriteCities },
    } = state;

    return {
        favorites: favoriteCities,
        cache: selectFavoriteCache(state),
        autocomplete,
        metric,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        autocompleteCity,
        addToFavoritesAndFetchWeather,
        removeFromFavorites,
        getAllFavoritesWeather,
        changeFavoriteIndex,
        reset,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltersBottomWrapper);
