import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';

function Tab({ children, className, index, noRenderWhenHidden }, { selectedTabIndex }) {
    const isHidden = index !== selectedTabIndex;
    return (
        <li className={classnames(isHidden && 'hidden', className)}>
            { !(noRenderWhenHidden && isHidden) ? children : undefined }
        </li>
    );
}

Tab.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    index: PropTypes.string.isRequired,
    noRenderWhenHidden: PropTypes.bool,
};

Tab.defaultProps = {
    className: '',
    noRenderWhenHidden: false,
};

Tab.contextTypes = {
    selectedTabIndex: PropTypes.string,
};

export default Tab;
