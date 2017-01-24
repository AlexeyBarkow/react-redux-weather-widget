import React, {PropTypes} from 'react';
import { Link } from 'react-router';

const MenuItem = ({
    children,
    className = '',
    header,
    divider,
    href,
    disabled = false,
    title = null,
    onClickHandler = null
}) => {
    switch (true) {
        case header:
            return (
                <li className={ className } title={ title }>
                    { children }
                </li>
            );
        case divider:
            return (
                <li className={`divider ${className}`} title={ title }></li>
            );
        default:
            return (
                <li>
                    <Link
                        className={ className }
                        href={ href || '#' }
                        disabled={ disabled }
                        onClick={ onClickHandler }
                        title={ title }>
                            {children}
                    </Link>
                </li>
            );
    }
};

MenuItem.PropTypes = {
    children: PropTypes.object,
    className: PropTypes.string,
    header: PropTypes.boolean,
    divider: PropTypes.boolean,
    href: PropTypes.string,
    disabled: PropTypes.boolean,
    title: PropTypes.string,
    onClickHandler: PropTypes.func
};

export default MenuItem;
