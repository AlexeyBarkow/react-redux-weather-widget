import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CityInputForm from '../CityInputForm';
import * as actions from '../../dataflow/actions/actions';

function mapStateToProps(state) {
    return {
        autocomplete: state.weatherApp.autocomplete,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CityInputForm);
