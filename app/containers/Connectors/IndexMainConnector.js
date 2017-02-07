import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../dataflow/actions/actions';
import IndexMain from '../IndexMain';

function mapStateToProps(state) {
    return {
        weather: state.weatherApp.weather,
        forecast: state.weatherApp.forecast,
        nearestCities: state.weatherApp.nearestCities,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexMain);
