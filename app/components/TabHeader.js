import React, { PropTypes } from 'react';

function TabHeader({
    children,
    className,
    index,
}, {
    selectedTabIndex,
    setSelectedTabIndex,
}) {
    return (
        <li className={`${index === selectedTabIndex ? 'active' : ''} ${className}`}>
            <a href="#" className="btn btn-link" onClick={() => setSelectedTabIndex(index)}>
                {children}
            </a>
        </li>
    );
}

TabHeader.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    index: PropTypes.string.isRequired,
};

TabHeader.defaultProps = {
    className: '',
};

TabHeader.contextTypes = {
    selectedTabIndex: PropTypes.string,
    setSelectedTabIndex: PropTypes.func,
};

export default TabHeader;
