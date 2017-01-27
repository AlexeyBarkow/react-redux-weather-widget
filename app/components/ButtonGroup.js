import React, { PropTypes } from 'react';

function ButtonGroup({
    children,
    className,
}) {
    return (
        <div
          className={`btn-group ${className}`}
        >
            { children }
        </div>
    );
}

ButtonGroup.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

ButtonGroup.defaultProps = {
    children: null,
    className: '',
};

export default ButtonGroup;
