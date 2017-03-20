import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BottomMapWrapper from '../BottomMapWrapper';
import { weatherOverallSelector } from '../../selectors';
import { getLocation } from '../../dataflow/actions';

function mapStateToProps(state) {
    return {
        geolocation: state.location.geolocation,
        weatherOverall: weatherOverallSelector(state),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getLocation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomMapWrapper);
