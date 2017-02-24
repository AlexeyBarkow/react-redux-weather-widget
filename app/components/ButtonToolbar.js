import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';

function ButtonToolbar({
    children,
    justified,
    className,
}) {
    const resultClassNames = classnames(
        'btn-toolbar',
        justified && 'btn-group-justified',
        className,
    );
    return (
        <div className={resultClassNames}>
            { children }
        </div>
    );
}

ButtonToolbar.propTypes = {
    children: PropTypes.node.isRequired,
    justified: PropTypes.bool,
    className: PropTypes.string,
};

ButtonToolbar.defaultProps = {
    children: null,
    justified: false,
    className: '',
};

export default ButtonToolbar;
