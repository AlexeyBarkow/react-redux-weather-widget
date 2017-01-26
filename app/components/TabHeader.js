import React, { PropTypes } from 'react';
import Button from './Button';

function TabHeader({ children, className }) {
    return (
        <li className={className}>
            <Button>
                {children}
            </Button>
        </li>
    );
}

TabHeader.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

TabHeader.defaultProps = {
    className: '',
};

export default TabHeader;
