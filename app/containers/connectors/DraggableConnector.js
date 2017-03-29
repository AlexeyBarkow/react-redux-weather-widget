import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Draggable from '../Draggable';
import { setDragData, dropData } from '../../dataflow/actions';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setDragData, dropData }, dispatch);
}

export default connect(null, mapDispatchToProps)(Draggable);
