import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FiltersContainer from '../FiltersContainer';
import { applyAllFilters } from '../../selectors/selectors';
import { setTotalsFilter } from '../../dataflow/actions/index';

function mapStateToProps(state) {
    return {
        metric: state.main.metric,
        filteredCache: applyAllFilters(state),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ applyAllFilters, setTotalsFilter }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltersContainer);
