import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../dataflow/actions/actions';
import IndexMain from '../IndexMain';
import { selectForecastFilter } from '../../selectors/selectors';

function mapStateToProps(state) {
    const {
        weather,
        forecastFilter,
        nearestCities,
        city,
        countryCode,
        metric,
    } = state;
    return {
        weather,
        forecast: selectForecastFilter(state),
        forecastFilter,
        nearestCities,
        city,
        countryCode,
        metric,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexMain);
