import React, { PropTypes, Component } from 'react';
import TabController from './TabController';
import Tab from '../components/Tab';
import TabHeader from '../components/TabHeader';
import TabContainer from '../components/TabContainer';
import WeatherSummary from '../components/WeatherSummary';
import WeatherForecastSummary from '../components/WeatherForecastSummary';

class IndexMain extends Component {
    constructor(props) {
        super(props);
        this.changeForecastFilter = this::this.changeForecastFilter;
    }
    componentWillMount() {
        this.loadCityInfo(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.loadCityInfo(newProps);
    }

    loadCityInfo({
        weather: { status },
        nearestCities,
        getWeather,
        getForecast,
        redirectToCity,
        city,
        countryCode,
        metric,
    }) {
        const oldCity = this.props.city;
        const oldCountryCode = this.props.countryCode;
        const oldMetric = this.props.metric;
        const { params: { country, cityname } } = this.props;

        if ((city !== cityname || country !== countryCode)
            && city && countryCode && status === 0) {
            redirectToCity(city, countryCode, metric);
        }

        if ((!city || !countryCode) && nearestCities.length > 0) {
            const nearestCityName = nearestCities[0].name;
            const nearestCityCountryCode = nearestCities[0].countryCode;
            redirectToCity(nearestCityName, nearestCityCountryCode, metric);
        }
        if (city && countryCode &&
            (city !== oldCity || countryCode !== oldCountryCode
                || metric !== oldMetric || status === 0)) {
            getWeather(city, countryCode, metric);
            getForecast(city, countryCode, metric);
        }
    }

    changeForecastFilter(e) {
        this.props.setForecastFilter(e.target.value);
    }

    render() {
        const { weather, forecast, forecastFilter } = this.props;
        return (
            <TabController defaultSelectedTabIndex="1">
                <TabContainer headerContainer>
                    <TabHeader index="1">City Overview</TabHeader>
                    <TabHeader index="2">Weather forecast</TabHeader>
                </TabContainer>
                <TabContainer>
                    <Tab index="1">
                        <WeatherSummary weather={weather} className="summary" />
                    </Tab>
                    <Tab index="2">
                        <WeatherForecastSummary forecastFilter={forecastFilter} changeFilter={this.changeForecastFilter} forecast={forecast} className="summary" />
                    </Tab>
                </TabContainer>
            </TabController>
        );
    }
}

IndexMain.propTypes = {
    weather: PropTypes.object,
    forecast: PropTypes.array,
/*eslint-disable react/no-unused-prop-types*/
    getWeather: PropTypes.func.isRequired,
    getForecast: PropTypes.func.isRequired,
    redirectToCity: PropTypes.func.isRequired,
    nearestCities: PropTypes.array,
    metric: PropTypes.string.isRequired,
/*eslint-enable react/no-unused-prop-types*/
    city: PropTypes.string,
    countryCode: PropTypes.string,
    params: PropTypes.object.isRequired,
    forecastFilter: PropTypes.string.isRequired,
    setForecastFilter: PropTypes.func.isRequired,
};

IndexMain.defaultProps = {
    weather: {
        status: 0,
    },
    forecast: {
        status: 0,
    },
    nearestCities: [],
    city: '',
    countryCode: '',
};

export default IndexMain;
