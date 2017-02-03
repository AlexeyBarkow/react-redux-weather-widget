import React, { PropTypes, Component } from 'react';
import TabController from './TabController';
import Tab from '../components/Tab';
import TabHeader from '../components/TabHeader';
import TabContainer from '../components/TabContainer';
import WeatherSummary from '../components/WeatherSummary';
import WeatherForecastSummary from '../components/WeatherForecastSummary';

class IndexMain extends Component {
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

IndexMain.contextTypes = {
    weather: PropTypes.object,
    forecast: PropTypes.array,
};

IndexMain.defaultProps = {
    weather: null,
    forecast: null,
};

export default IndexMain;
