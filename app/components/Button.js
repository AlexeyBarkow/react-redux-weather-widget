import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function Button({
    children,
    onClickHandler,
    className,
    href,
    disabled,
    noDefaultStyles,
    type,
}) {
    const classesToPass = `${noDefaultStyles ? '' : 'btn btn-default'} ${className}`;

    return (
        href !== ''
        ?
            <Link
              disabled={disabled}
              className={classesToPass}
              to={href}
              onClick={onClickHandler}
            >
                {children}
            </Link>
        :
            <button
              disabled={disabled}
              className={classesToPass}
              onClick={onClickHandler}
              type={type}
            >
                { children }
            </button>
    );
}

Button.propTypes = {
    children: PropTypes.node,
    onClickHandler: PropTypes.func,
    className: PropTypes.string,
    href: PropTypes.string,
    disabled: PropTypes.bool,
    noDefaultStyles: PropTypes.bool,
    type: PropTypes.string,
};

Button.defaultProps = {
    children: null,
    onClickHandler: null,
    className: '',
    href: '',
    disabled: false,
    noDefaultStyles: false,
    type: null,
};

export default Button;
