import React, {PropTypes} from 'react';
import Header from './Header.jsx';
import Navbar from './Navbar.jsx';
import {Link} from 'react-router';

const navButtons = [
  {
    title: 'lorem',
    link: '/'
  }, {
    title: 'ipsum',
    link: '/'
  }, {
    title: 'dolor',
    link: [
      {
        title: 'dolor-sit',
        link: '/'
      }, {
        title: 'dolor-amet',
        link: '/'
      }
    ]
  }
];

const App = ({children}) => (
  <div>
    <Header>
      <Navbar navButtons={navButtons}></Navbar>
    </Header>
    <div>
      {children}
    </div>
    <div>
      <Link to="/about">about</Link>
    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.object
};

export default App;
