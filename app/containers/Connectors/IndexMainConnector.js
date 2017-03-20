import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setForecastFilter } from '../../dataflow/actions';
import IndexMain from '../IndexMain';
import { selectForecastFilter } from '../../selectors';

function mapStateToProps(state) {
    const {
        weather: {
            weather,
            forecastFilter,
        },
        main: {
            city,
            countryCode,
            metric,
        },
        location: {
            nearestCities,
        },
    } = state;
    return {
        forecast: selectForecastFilter(state),
        weather,
        forecastFilter,
        nearestCities,
        city,
        countryCode,
        metric,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setForecastFilter }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexMain);
