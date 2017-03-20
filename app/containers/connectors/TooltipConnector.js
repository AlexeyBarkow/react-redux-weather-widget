import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Tooltip from '../Tooltip';
import { createTooltip, destroyTooltip } from '../../dataflow/actions';

function mapStateToProps({ tooltip }) {
    return { tooltip };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createTooltip, destroyTooltip }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tooltip);
