import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { change } from 'redux-form';
import FiltersForm from '../FiltersForm';
import { selectFilterFormValues, selectFilterFormMeta } from '../../selectors';
import { autocompleteCity, clearAutocomplete } from '../../dataflow/actions';

function mapStateToProps(state) {
    const { main: { autocomplete } } = state;

    return {
        formValues: selectFilterFormValues(state),
        formMeta: selectFilterFormMeta(state),
        autocomplete,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeFormField: change,
        autocompleteCity,
        clearAutocomplete,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltersForm);
