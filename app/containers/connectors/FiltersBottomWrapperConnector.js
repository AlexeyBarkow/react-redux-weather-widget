import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FiltersBottomWrapper from '../FiltersBottomWrapper';
import { autocompleteCity } from '../../dataflow/actions/index';

function mapStateToProps({ main: { autocomplete, metric }, favorites: { favoriteCities } }) {
    return {
        autocomplete,
        metric,
        favorites: favoriteCities,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ autocompleteCity }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltersBottomWrapper);
