import React, { PropTypes } from 'react';

function ButtonToolbar({
    children,
    justified,
}) {
    return (
        <div
          className={`btn-toolbar${
            justified
            ? ' btn-group-justified'
            : ''}`}
        >
            { children }
        </div>
    );
}

ButtonToolbar.propTypes = {
    children: PropTypes.node.isRequired,
    justified: PropTypes.bool,
};

ButtonToolbar.defaultProps = {
    children: null,
    justified: false,
};

export default ButtonToolbar;
