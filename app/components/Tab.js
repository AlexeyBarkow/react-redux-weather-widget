import React, { PropTypes } from 'react';

function Tab({ children, className, index }, { selectedTabIndex }) {
    return (
        <li className={`${index === selectedTabIndex ? '' : 'hidden'} className`}>
            {children}
        </li>
    );
}

Tab.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    index: PropTypes.string.isRequired,
};

Tab.defaultProps = {
    className: '',
};

Tab.contextTypes = {
    selectedTabIndex: PropTypes.string,
};

export default Tab;
