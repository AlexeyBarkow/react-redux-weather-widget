import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';

function Collapse({ children, className, collapsed }) {
    return (
        <div className={classnames(className, 'collapse', collapsed && 'in')}>
            { children }
        </div>
    );
}

Collapse.propTypes = {
    children: PropTypes.node.isRequired,
    collapsed: PropTypes.bool,
    className: PropTypes.string,
};

Collapse.defaultProps = {
    collapsed: false,
    className: '',
};

export default Collapse;
