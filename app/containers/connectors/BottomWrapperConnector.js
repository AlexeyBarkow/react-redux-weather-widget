import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BottomWrapper from '../BottomWrapper';
import { weatherOverallSelector } from '../../selectors/selectors';
import * as actions from '../../dataflow/actions/index';

function mapStateToProps(state) {
    return {
        geolocation: state.geolocation,
        weatherOverall: weatherOverallSelector(state),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomWrapper);
