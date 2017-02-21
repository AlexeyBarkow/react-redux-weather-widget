import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CityInputForm from '../CityInputForm';
import * as actions from '../../dataflow/actions/index';

function mapStateToProps({ main: { autocomplete, metric } }) {
    return { initialValues: { metric }, autocomplete };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CityInputForm);
