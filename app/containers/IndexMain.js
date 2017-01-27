import React, { Component } from 'react';
import TabController from './TabController';
import Tab from '../components/Tab';
import TabHeader from '../components/TabHeader';
import TabContainer from '../components/TabContainer';

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
                        <h2>Lorem</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe corrupti
                            nihil sunt placeat consequatur assumenda earum maxime, nostrum
                            laboriosam et a fugit omnis accusamus at! Animi distinctio soluta
                            eaque quisquam!</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt,
                            laudantium, dolor non repudiandae esse placeat sed dolores animi
                            tempore inventore molestiae reiciendis nulla officiis sequi eos
                            suscipit error iure id.</p>
                    </Tab>
                    <Tab index="2">
                        <h2>Hidden lorem</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga itaque
                            dolor laborum consequatur explicabo debitis deleniti cum odio,
                            voluptatem magni vitae quis deserunt natus quasi veniam maiores
                            doloremque placeat recusandae! Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Laboriosam fuga, obcaecati corrupti, eveniet delectus
                            consectetur placeat saepe minima dolorem, nesciunt, quis voluptate
                            nulla vero vel nam ipsa perferendis eius tempore.</p>
                    </Tab>
                </TabContainer>
            </TabController>
        );
    }
}

export default IndexMain;
