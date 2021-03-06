import React from 'react';
import { Route, IndexRoute } from 'react-router';
import RootContainer from './containers/connectors/RootContainerConnector';
import About from './components/About';
import IndexMain from './containers/connectors/IndexMainConnector';
import WrongPath from './components/WrongPath';
import BottomWrapper from './containers/connectors/BottomWrapperConnector';
import FiltersContainer from './containers/connectors/FiltersContainerConnector';
import FiltersBottomWrapper from './containers/connectors/FiltersBottomWrapperConnector';

const routes = (
    <Route path="/" component={RootContainer}>
        <IndexRoute components={{ main: IndexMain, bottom: BottomWrapper }} />
        <Route path="/about" components={{ main: About, bottom: null }} />
        <Route path="/home" components={{ main: IndexMain, bottom: BottomWrapper }} />
        <Route path="/filters" components={{ main: FiltersContainer, bottom: FiltersBottomWrapper }} />
        <Route path="/cities/:country/:cityname" components={{ main: IndexMain, bottom: BottomWrapper }} />
        <Route path="*" components={{ main: WrongPath, bottom: null }} />
    </Route>
);
export default routes;
