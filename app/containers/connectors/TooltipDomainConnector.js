import { connect } from 'react-redux';
import TooltipDomain from '../TooltipDomain';

function mapStateToProps({ tooltip }) {
    return { tooltip };
}

export default connect(mapStateToProps)(TooltipDomain);
