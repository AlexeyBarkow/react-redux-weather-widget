import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const App = ({ children }) =>
(
    <div>
        <div>
            { children }
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
