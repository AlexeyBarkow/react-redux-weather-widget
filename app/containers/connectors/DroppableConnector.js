import { connect } from 'react-redux';
import Droppable from '../Droppable';

function mapStateToProps({ dragAndDrop: { dragData } }) {
    return {
        dragData,
    };
}


export default connect(mapStateToProps)(Droppable);
