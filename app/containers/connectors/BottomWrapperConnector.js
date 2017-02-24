import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BottomWrapper from '../BottomWrapper';
import { weatherOverallSelector } from '../../selectors/selectors';
import { getLocation } from '../../dataflow/actions/index';

function mapStateToProps(state) {
    return {
        geolocation: state.location.geolocation,
        weatherOverall: weatherOverallSelector(state),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getLocation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomWrapper);
