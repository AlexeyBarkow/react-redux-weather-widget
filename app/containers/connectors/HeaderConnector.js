import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../Header';
import { redirectToCity } from '../../dataflow/actions/index';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ redirectToCity }, dispatch);
}

export default connect(null, mapDispatchToProps)(Header);
