import React, { PropTypes, Component } from 'react';
import TabController from './TabController';
import Tab from '../components/Tab';
import TabHeader from '../components/TabHeader';
import TabContainer from '../components/TabContainer';
import WeatherSummary from '../components/WeatherSummary';
import WeatherForecastSummary from '../components/WeatherForecastSummary';

class IndexMain extends Component {
    componentWillMount() {
        this.loadCityInfo(this.props, this.context);
    }

    componentWillReceiveProps(newProps, newContext) {
        this.loadCityInfo(newProps, newContext);
    }

    loadCityInfo(newProps, newContext) {
        const {
            router: {
                params: { cityname, country },
                location: { query: { metric } },
            },
        } = newProps;
        const {
            weather: { status },
            nearestCities,
            getWeather,
            getForecast,
            redirectToCity,
        } = newContext;
        const oldCityname = this.props.router.params.cityname;
        const oldCountry = this.props.router.params.country;

        if (!cityname && !country && nearestCities.length > 0) {
            const { name, countryCode } = nearestCities[0];
            redirectToCity(name, countryCode);
        }
        if (cityname && country &&
            (newProps !== this.props || status === 0
            || cityname !== oldCityname || country !== oldCountry)) {
            getWeather(cityname, country, metric);
            getForecast(cityname, country, metric);
        }
    }

    render() {
        const { weather, forecast } = this.context;
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
    router: PropTypes.object.isRequired,
};

IndexMain.contextTypes = {
    weather: PropTypes.object,
    forecast: PropTypes.array,
    getWeather: PropTypes.func.isRequired,
    getForecast: PropTypes.func.isRequired,
    redirectToCity: PropTypes.func.isRequired,
    nearestCities: PropTypes.array,
};

export default IndexMain;
