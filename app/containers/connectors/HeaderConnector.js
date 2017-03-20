import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../Header';
import { redirectToCity, autocompleteCity } from '../../dataflow/actions';

function mapStateToProps({ main: { autocomplete, metric } }) {
    return { metric, autocomplete };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ redirectToCity, autocompleteCity }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
