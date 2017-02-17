import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CityInputForm from '../CityInputForm';
import * as actions from '../../dataflow/actions/index';

function mapStateToProps(state) {
    return {
        autocomplete: state.autocomplete,
        metric: state.metric,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CityInputForm);
