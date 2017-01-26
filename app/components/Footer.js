import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function Footer({ children, className }) {
    return (
        <footer className={`${className} container`}>
            <Link to="/about">about</Link>
            {children}
        </footer>
    );
}

Footer.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

Footer.defaultProps = {
    children: null,
    className: '',
};

export default Footer;
