import React, { PropTypes } from 'react';

function Tab({ children, className }) {
    return (
        <li className={className}>
            {children}
        </li>
    );
}

Tab.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

Tab.defaultProps = {
    className: '',
};

export default Tab;
