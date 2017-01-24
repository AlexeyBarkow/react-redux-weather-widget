import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Button = ({
    children,
    onClickHandler = null,
    className = '',
    href = null,
    disabled = false
}) => {
    const classesToPass = `btn btn-default ${className}`;
    return (href
        ? <Link
            disabled={disabled}
            className={classesToPass}
            to={href}
            onClick={onClickHandler}>
                {children}
            </Link>
        : <button
            disabled={!!disabled}
            className={classesToPass}
            onClick={onClickHandler}>
                { children }
            </button>);
};

Button.PropTypes = {
    children: PropTypes.object,
    onClickHandler: PropTypes.func,
    className: PropTypes.string,
    href: PropTypes.string,
    disabled: PropTypes.bool
}

export default Button;
