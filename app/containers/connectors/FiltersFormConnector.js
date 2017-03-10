import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FiltersForm from '../FiltersForm';
import { selectFilterFormValues } from '../../selectors/formSelector';
import { autocompleteCity } from '../../dataflow/actions/index';

function mapStateToProps(state) {
    const { main: { autocomplete } } = state;
    return {
        formValues: selectFilterFormValues(state),
        autocomplete,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ autocompleteCity }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltersForm);
