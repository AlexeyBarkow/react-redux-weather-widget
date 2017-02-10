import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RootContainer from '../RootContainer';
import { weatherOverallSelector } from '../../selectors/selectors';
import * as actions from '../../dataflow/actions/actions';

function mapStateToProps(state) {
    return {
        geolocation: state.geolocation,
        weatherOverall: weatherOverallSelector(state),
        nearestCities: state.nearestCities,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
