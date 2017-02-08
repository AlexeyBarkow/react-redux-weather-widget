import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../dataflow/actions/actions';
import IndexMain from '../IndexMain';

function mapStateToProps({
    weather,
    forecast,
    nearestCities,
    city,
    countryCode,
    metric,
}) {
    return {
        weather,
        forecast,
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
