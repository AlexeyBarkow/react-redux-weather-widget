import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';

function ButtonGroup({
    children,
    className,
    vertical,
    block,
    justified,
}) {
    const resultClassNames = classnames(
        `btn-group${vertical ? '-vertical' : ''}`,
        block && 'btn-block',
        justified && 'btn-group-justified',
        className,
    );
    return (
        <div className={resultClassNames}>
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
