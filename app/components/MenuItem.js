import React, {PropTypes} from 'react';
import { Link } from 'react-router';

function MenuItem({
    children,
    className,
    header,
    divider,
    href,
    disabled,
    title,
    onClickHandler,
}) {
    switch (true) {
        case header:
            return (
                <li className={className} title={title}>
                    {children}
                </li>
            );
        case divider:
            return (
                <li
                  className={`divider ${className}`}
                  title={title}
                ></li>
            );
        default:
            return (
                <li>
                    <Link
                      className={className}
                      href={href || '#'}
                      disabled={disabled}
                      onClick={onClickHandler}
                      title={title}
                    >
                        {children}
                    </Link>
                </li>
            );
    }
};

MenuItem.propTypes = {
    children: PropTypes.object,
    className: PropTypes.string,
    header: PropTypes.boolean,
    divider: PropTypes.boolean,
    href: PropTypes.string,
    disabled: PropTypes.boolean,
    title: PropTypes.string,
    onClickHandler: PropTypes.func,
};

MenuItem.defaultProps = {
    children: null,
    className: '',
    header: false,
    divider: false,
    href: '',
    disabled: false,
    title: '',
    onClickHandler: null,
};

export default MenuItem;
