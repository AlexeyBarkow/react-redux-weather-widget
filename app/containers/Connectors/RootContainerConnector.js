import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RootContainer from '../RootContainer';
import { weatherOverallSelector } from '../../selectors/selectors';
import { getLocation, getNearestTo } from '../../dataflow/actions/index';

function mapStateToProps(state) {
    return {
        weatherOverall: weatherOverallSelector(state),
        nearestCities: state.location.nearestCities,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getLocation, getNearestTo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
