import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames/dedupe';
import Tooltip from '../containers/Tooltip';


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
    tooltip,
}) {
    const button = (btnClassName = '') => {
        const classesToPass = classnames(!noDefaultStyles && `btn btn-${link ? 'link ' : 'default '}`, btnClassName);
        if (href !== undefined) {
            if (href[0] === '#') {
                return (
                    <a
                      href={href}
                      disabled={disabled}
                      className={classesToPass}
                      title={title}
                      onClick={onClickHandler}
                    >
                        { children }
                    </a>
                );
            }
            return (
                <Link
                  disabled={disabled}
                  className={classesToPass}
                  title={title}
                  to={href}
                  onClick={onClickHandler}
                >
                    { children }
                </Link>
            );
        }
        return (
            <button
              disabled={disabled}
              className={classesToPass}
              onClick={onClickHandler}
              type={type}
            >
                { children }
            </button>
        );
    };

    if (tooltip) {
        return (
            <Tooltip className={className} {...tooltip}>
                { button() }
            </Tooltip>
        );
    }
    return button(className);
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
    tooltip: PropTypes.object,
};

Button.defaultProps = {
    children: null,
    onClickHandler: null,
    className: '',
    href: undefined,
    disabled: false,
    noDefaultStyles: false,
    type: null,
    link: false,
    title: null,
    tooltip: null,
};

export default Button;
