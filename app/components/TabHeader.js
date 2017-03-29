import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';
import Button from './Button';

function TabHeader({
    children,
    className,
    index,
}, {
    selectedTabIndex,
    setSelectedTabIndex,
}) {
    const handler = () => {
        setSelectedTabIndex(index);
    };
    return (
        <li className={classnames(index === selectedTabIndex && 'active', className)}>
            <Button link href="#" onClickHandler={handler}>
                {children}
            </Button>
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
