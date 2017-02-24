import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CityInputForm from '../CityInputForm';
import { autocompleteCity } from '../../dataflow/actions/index';

function mapStateToProps({ main: { autocomplete, metric } }) {
    return { initialValues: { metric }, autocomplete };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ autocompleteCity }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CityInputForm);
