import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';

function TabContainer({ children, className, headerContainer }) {
    const type = headerContainer
        ? 'tab__header nav nav-tabs'
        : 'tab__container';

    return (
        <ul className={classnames(className, type)}>
            {children}
        </ul>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    headerContainer: PropTypes.bool,
};

TabContainer.defaultProps = {
    className: '',
    headerContainer: false,
};

export default TabContainer;
