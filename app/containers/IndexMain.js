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

    loadCityInfo(newProps) {
        const {
            //ToDo: find out the difference between routeParams and router.params
            //It seems like router.params isn't synchronized with store
            routeParams: { cityname, country },
            router: {
                location: { query: { metric } },
            },
            weather: { status },
            nearestCities,
            getWeather,
            getForecast,
            redirectToCity,
        } = newProps;
        const oldCityname = this.props.routeParams.cityname;
        const oldCountry = this.props.routeParams.country;

        if (!cityname && !country && nearestCities.length > 0) {
            const { name, countryCode } = nearestCities[0];
            redirectToCity(name, countryCode);
        }
        if (cityname && country &&
            (newProps === this.props || status === 0
            || cityname !== oldCityname || country !== oldCountry)) {
            getWeather(cityname, country, metric);
            getForecast(cityname, country, metric);
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
    router: PropTypes.object.isRequired,
    getWeather: PropTypes.func.isRequired,
    getForecast: PropTypes.func.isRequired,
    redirectToCity: PropTypes.func.isRequired,
    nearestCities: PropTypes.array,
/*eslint-enable react/no-unused-prop-types*/
    routeParams: PropTypes.object.isRequired,
};

IndexMain.defaultProps = {
    weather: {
        status: 0,
    },
    forecast: {
        status: 0,
    },
    nearestCities: [],
};

export default IndexMain;
