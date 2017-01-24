import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import routes from '../routes.jsx';
import DevTools from './DevTools.jsx';
import {Router} from 'react-router';

class Root extends Component {
  render() {
    const {store, history} = this.props;
    return (
      <Provider store={store}>
        <div className="my-app-root-class">
          <Router history={history} routes={routes}/>
          <DevTools></DevTools>
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Root;
