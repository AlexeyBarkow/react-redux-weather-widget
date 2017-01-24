import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes from '../routes.js';
import { Router } from 'react-router';

class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <div className="my-app-root-class">
          <Router history={history} routes={routes}/>
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Root;
