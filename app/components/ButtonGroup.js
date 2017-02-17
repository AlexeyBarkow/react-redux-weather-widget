import React, { PropTypes } from 'react';

function ButtonGroup({
    children,
    className,
    vertical,
    block,
    justified,
}) {
    return (
        <div
          className={`btn-group${
                vertical ? '-vertical' : ''
            }${
                block ? ' btn-block ' : ' '
            }${
                justified ? ' btn-group-justified ' : ' '
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
    justified: PropTypes.bool,
};

ButtonGroup.defaultProps = {
    children: null,
    className: '',
    vertical: false,
    block: false,
    justified: false,
};

export default ButtonGroup;
