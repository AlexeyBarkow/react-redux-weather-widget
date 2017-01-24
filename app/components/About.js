import React, { PropTypes } from 'react';

function About({ children }) {
    return (
        <div className="container">
            <p>by Barkow Alexey</p>
            { children }
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
