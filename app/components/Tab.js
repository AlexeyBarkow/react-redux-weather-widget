import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';

function Tab({ children, className, index }, { selectedTabIndex }) {
    return (
        <li className={classnames(index !== selectedTabIndex && 'hidden', className)}>
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
