import React, { Component } from 'react';
import TabController from './TabController';
import Tab from '../components/Tab';
import TabHeader from '../components/TabHeader';
import TabContainer from '../components/TabContainer';
import WeatherSummary from '../components/WeatherSummary';

class IndexMain extends Component {
    render() {
        return (
            <TabController defaultSelectedTabIndex="1">
                <TabContainer headerContainer>
                    <TabHeader index="1">City Overview</TabHeader>
                    <TabHeader index="2">More info</TabHeader>
                </TabContainer>
                <TabContainer>
                    <Tab index="1">
                        <WeatherSummary className="summary" />
                    </Tab>
                    <Tab index="2">
                        <h2>Hidden lorem</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga itaque
                            dolor laborum consequatur explicabo debitis deleniti cum odio,
                            voluptatem magni vitae quis deserunt natus quasi veniam maiores
                            doloremque placeat recusandae! Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Laboriosam fuga, obcaecati corrupti, eveniet delectus
                            consectetur placeat saepe minima dolorem, nesciunt, quis voluptate
                            nulla vero vel nam ipsa perferendis eius tempore.
                        </p>
                    </Tab>
                </TabContainer>
            </TabController>
        );
    }
}

export default IndexMain;
