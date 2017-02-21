import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../Header';
import * as actions from '../../dataflow/actions/index';

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(null, mapDispatchToProps)(Header);
