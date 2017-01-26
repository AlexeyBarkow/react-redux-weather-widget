import React, { PropTypes } from 'react';

function ButtonGroup({
    children,
    justified,
    noPadding,
}) {
    return (
        <ul
          className={`btn-toolbar${
            justified
            ? ' btn-group-justified'
            : ''}${
            noPadding
            ? ' no-list-padding'
            : ''}`}
        >
            { children }
        </ul>
    );
}

ButtonGroup.propTypes = {
    children: PropTypes.node.isRequired,
    justified: PropTypes.bool,
    noPadding: PropTypes.bool,
};

ButtonGroup.defaultProps = {
    children: null,
    justified: false,
    noPadding: false,
};

export default ButtonGroup;
