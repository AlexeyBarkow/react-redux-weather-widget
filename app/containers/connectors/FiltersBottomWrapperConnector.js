import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FiltersBottomWrapper from '../FiltersBottomWrapper';
import { autocompleteCity, addToFavoritesAndFetchWeather, removeFromFavorites, getAllFavoritesWeather, changeFavoriteIndex } from '../../dataflow/actions/index';
import { selectFavoriteCache } from '../../selectors/selectors';

function mapStateToProps(state) {
    const {
        main: { autocomplete, metric },
        favorites: { favoriteCities },
    } = state;

    return {
        autocomplete,
        metric,
        favorites: favoriteCities,
        cache: selectFavoriteCache(state),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        autocompleteCity,
        addToFavoritesAndFetchWeather,
        removeFromFavorites,
        getAllFavoritesWeather,
        changeFavoriteIndex,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltersBottomWrapper);
