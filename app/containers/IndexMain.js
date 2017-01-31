import React, { Component } from 'react';
import TabController from './TabController';
import Tab from '../components/Tab';
import TabHeader from '../components/TabHeader';
import TabContainer from '../components/TabContainer';
import WeatherSummary from '../components/WeatherSummary';
import WeatherForecastSummary from '../components/WeatherForecastSummary';

class IndexMain extends Component {
    render() {
        return (
            <TabController defaultSelectedTabIndex="1">
                <TabContainer headerContainer>
                    <TabHeader index="1">City Overview</TabHeader>
                    <TabHeader index="2">Weather forecast</TabHeader>
                </TabContainer>
                <TabContainer>
                    <Tab index="1">
                        <WeatherSummary className="summary" />
                    </Tab>
                    <Tab index="2">
                        <WeatherForecastSummary className="summary" />
                    </Tab>
                </TabContainer>
            </TabController>
        );
    }
}

export default IndexMain;
