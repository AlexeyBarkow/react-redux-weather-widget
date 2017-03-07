import React, { PropTypes, Component } from 'react';
import FiltersForm from './FiltersForm';
import FilteredItemsContainer from '../components/FilteredItemsContainer';

class FiltersContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFilterApplied: false,
        };
    }

    componentWillUnmount() {
        this.setState({
            isFilterApplied: false,
        });
    }

    filtersFormSubmit = ({
        minTemperature,
        maxTemperature,
        minPressure,
        maxPressure,
        minHumidity,
        maxHumidity,
        minWindSpeed,
        maxWindSpeed,
        weatherIcons,
    }) => {
        const { setTotalsFilter } = this.props;
        // redux-form seems to be too smart: it deletes keys with undefined values
        const values = {
            minTemperature,
            maxTemperature,
            minPressure,
            maxPressure,
            minHumidity,
            maxHumidity,
            minWindSpeed,
            maxWindSpeed,
            weatherIcons,
        };
        Object.entries(values).forEach(([key, filter]) => setTotalsFilter(key, filter));

        this.setState({
            isFilterApplied: true,
        });
    };

    render() {
        const { children, metric, filteredCache } = this.props;
        const { isFilterApplied } = this.state;
        return (
            <div className="container-fluid">
                <h1>Apply filters to your form</h1>
                <FiltersForm className="pseudo-paragraph" metric={metric} onSubmit={this.filtersFormSubmit} />
                { isFilterApplied &&
                    <FilteredItemsContainer className="pseudo-paragraph" metric={metric} items={filteredCache} /> }
                { children }
            </div>
        );
    }
}

FiltersContainer.propTypes = {
    children: PropTypes.node,
    filteredCache: PropTypes.array,
    metric: PropTypes.string.isRequired,
    setTotalsFilter: PropTypes.func.isRequired,
};

FiltersContainer.defaultProps = {
    children: null,
    filteredCache: [],
};

export default FiltersContainer;
