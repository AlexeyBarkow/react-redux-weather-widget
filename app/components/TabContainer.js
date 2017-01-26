import React, { PropTypes } from 'react';

function TabContainer({ children, className, containerType }) {
    const type = containerType === 'header'
        ? 'tab__header'
        : 'tab__container';

    return (
        <ul className={`${className} ${type}`}>
            {children}
        </ul>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    containerType: PropTypes.string.isRequired,
};

TabContainer.defaultProps = {
    className: '',
};

export default TabContainer;
