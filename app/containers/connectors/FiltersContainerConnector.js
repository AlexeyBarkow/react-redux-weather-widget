import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FiltersContainer from '../FiltersContainer';
import { applyAllFilters } from '../../selectors/selectors';
import { setTotalsFilter, fetchWeatherAndForecast, setCitiesToFilter } from '../../dataflow/actions/index';

function mapStateToProps(state) {
    const { favorites: { favoriteCities } } = state;
    return {
        metric: state.main.metric,
        filteredCache: applyAllFilters(state),
        favoriteCities,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        applyAllFilters,
        fetchWeatherAndForecast,
        setTotalsFilter,
        setCitiesToFilter,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltersContainer);
