import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';

function Navbar({ children, className }) {
    return (
        <ul role="navigation" className={classnames(className, 'nav navbar-nav')}>
            {children}
        </ul>
    );
}

Navbar.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

Navbar.defaultProps = {
    children: null,
    className: '',
};

export default Navbar;
