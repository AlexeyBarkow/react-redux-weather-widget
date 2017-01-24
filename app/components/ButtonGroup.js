import React, { PropTypes } from 'react';

const ButtonGroup = ({
    children,
    justified = false,
    noPadding = false,
}) => {
    return (
        <ul className={`btn-toolbar${
            justified
            ? ' btn-group-justified'
            : '' }${
            noPadding
            ? ' no-list-padding'
            : ''}`}>
            { children }
        </ul>
    );
};

ButtonGroup.PropTypes = {
    children: PropTypes.node.isRequired,
    justified: PropTypes.bool,
    noPadding: PropTypes.bool,
};

export default ButtonGroup;
