import React, { PropTypes, Component } from 'react';
import TabController from './TabController';
import Tab from '../components/Tab';
import TabHeader from '../components/TabHeader';
import TabContainer from '../components/TabContainer';
import WeatherSummary from '../components/WeatherSummary';
import WeatherForecastSummary from '../components/WeatherForecastSummary';

class IndexMain extends Component {
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

        if (city && countryCode && status === 0) {
            redirectToCity(city, countryCode, metric);
        }

        if ((!city || !countryCode) && nearestCities.length > 0) {
            const nearestCityName = nearestCities[0].name;
            const nearestCityCountryCode = nearestCities[0].countryCode;
            redirectToCity(nearestCityName, nearestCityCountryCode, metric);
        }
        if (city !== oldCity || countryCode !== oldCountryCode || status === 0) {
            getWeather(city, countryCode, metric);
            getForecast(city, countryCode, metric);
        }
    }

    render() {
        const { weather, forecast } = this.props;
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
                        <WeatherForecastSummary forecast={forecast} className="summary" />
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
