import React, { PropTypes } from 'react';
import ButtonToolbar from './ButtonToolbar';


function Navbar({ children, className }) {
    return (
        <nav className={`${className}`}>
            <ButtonToolbar>
                {children}
            </ButtonToolbar>
        </nav>
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
