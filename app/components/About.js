import React, { PropTypes } from 'react';
import { WEATHER_API_URL, GEONAMES_SITE_URL, GOOGLE_MAP_SITE_URL, REACT_URL, REDUX_URL } from '../utils/constants';

function About({ children }) {
    return (
        <div className="container-fluid">
            <h1>About:</h1>
            { children }
            <p className="divider" />
            <p>
                This is a free web-application based on the following public API:
            </p>
            <p><a target="_blank" rel="noopener noreferrer" href={REACT_URL}>React.js</a> — a JavaScript library for building user interfaces
            </p>
            <p><a target="_blank" rel="noopener noreferrer" href={REDUX_URL}>Redux</a> — predictable state container for JavaScript apps
            </p>
            <p>
                <a target="_blank" rel="noopener noreferrer" href={WEATHER_API_URL}>{ WEATHER_API_URL }</a> —
                    open weather map API
            </p>
            <p>
                <a target="_blank" rel="noopener noreferrer" href={GEONAMES_SITE_URL}>{ GEONAMES_SITE_URL }</a> —
                    geonames geographical database
            </p>
            <p>
                <a target="_blank" rel="noopener noreferrer" href={GOOGLE_MAP_SITE_URL}>Google Maps</a> —
                    JavaScript API
            </p>
            <p className="divider" />
            <p>&copy; Aliaksei Barkow, 2017</p>
        </div>
    );
}

About.propTypes = {
    children: PropTypes.node,
};

About.defaultProps = {
    children: null,
};

export default About;
