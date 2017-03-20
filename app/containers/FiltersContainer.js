import React, { PropTypes, Component } from 'react';
import FiltersForm from './connectors/FiltersFormConnector';
import FilteredItemsContainer from '../components/FilteredItemsContainer';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { VALIDATE_ADDRESS_REGEXP } from '../utils/constants';

class FiltersContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterStatus: 'empty',
        };
    }

    componentWillUnmount() {
        this.setState({
            filterStatus: 'empty',
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
        filterCityRadio,
        filterSelectedCities,
        filterDateCheckbox,
        filterDatepickerArray,
    }) => {
        const {
            setTotalsFilter,
            setCitiesToFilter,
            favoriteCities,
            fetchWeatherAndForecast,
        } = this.props;
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
            filterDatepickerArray,
        };
        let citiesToFilterArray;

        if (!filterDateCheckbox && !filterDatepickerArray) {
            values.filterDatepickerArray = [];
        }

        if (filterCityRadio === 'custom') {
            citiesToFilterArray = filterSelectedCities
            ? filterSelectedCities.map((curr) => {
                const [cityname, countryCode] = curr.match(VALIDATE_ADDRESS_REGEXP).slice(1);
                return { cityname, countryCode };
            })
            : [];
        }

        citiesToFilterArray = citiesToFilterArray || favoriteCities;

        this.setState({
            filterStatus: 'loading',
        });

        Promise.all(citiesToFilterArray.map(({ cityname, countryCode }) =>
            fetchWeatherAndForecast(cityname, countryCode)))
            .then(() => {
                setCitiesToFilter(citiesToFilterArray);
                Object.entries(values).forEach(([key, filter]) => setTotalsFilter(key, filter));
                this.setState({
                    filterStatus: 'ready',
                });
            }).catch((...args) => {
                // ToDo: add more complex error handling
                /*eslint-disable no-console*/
                console.error('error', args);
                /*eslint-enable no-console*/
                this.setState({
                    filterStatus: 'error',
                });
            });
    };

    render() {
        const { children, metric, filteredCache } = this.props;
        const { filterStatus } = this.state;

        return (
            <div className="container-fluid">
                <h1>Apply filters to your form</h1>
                <FiltersForm className="pseudo-paragraph" metric={metric} onSubmit={this.filtersFormSubmit} />
                {(() => {
                    if (filterStatus === 'ready') {
                        return <FilteredItemsContainer className="pseudo-paragraph" metric={metric} items={filteredCache} />;
                    }

                    if (filterStatus === 'loading') {
                        return <Loading className="pseudo-paragraph" />;
                    }

                    if (filterStatus === 'error') {
                        return <ErrorMessage className="pseudo-paragraph" message="Something went wrong" />;
                    }

                    return null;
                })()}
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
    setCitiesToFilter: PropTypes.func.isRequired,
    fetchWeatherAndForecast: PropTypes.func.isRequired,
    favoriteCities: PropTypes.array,
};

FiltersContainer.defaultProps = {
    children: null,
    filteredCache: [],
    favoriteCities: [],
};

export default FiltersContainer;
