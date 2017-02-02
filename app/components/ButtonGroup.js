import React, { PropTypes } from 'react';

function ButtonGroup({
    children,
    className,
    vertical,
    block,
}) {
    return (
        <div
          className={`btn-group${
                vertical
                ? '-vertical'
                : ''
            }${
                block
                ? ' btn-block '
                : ' '
            }${className}`}
        >
            { children }
        </div>
    );
}

ButtonGroup.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    vertical: PropTypes.bool,
    block: PropTypes.bool,
};

ButtonGroup.defaultProps = {
    children: null,
    className: '',
    vertical: false,
    block: false,
};

export default ButtonGroup;
