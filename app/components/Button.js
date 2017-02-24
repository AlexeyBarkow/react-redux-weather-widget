import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames/dedupe';

function Button({
    children,
    onClickHandler,
    className,
    href,
    disabled,
    link,
    noDefaultStyles,
    type,
    title,
}) {
    const classesToPass = classnames(!noDefaultStyles && `btn btn-${link ? 'link ' : 'default '}`, className);

    return (
        href !== ''
        ?
            <Link
              disabled={disabled}
              className={classesToPass}
              title={title}
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
    link: PropTypes.bool,
    title: PropTypes.string,
};

Button.defaultProps = {
    children: null,
    onClickHandler: null,
    className: '',
    href: '',
    disabled: false,
    noDefaultStyles: false,
    type: null,
    link: false,
    title: null,
};

export default Button;
