import React from 'react';

const MenuItem = ({ children, className = '', header, divider, href, disabled = false, title = null, onClickHandler = null }) => {
    switch (true) {
        case header:
            return (
                <li className={ className } title={ title }>
                    { children }
                </li>
            );
        case divider:
            return (
                <li className={ `divider ${ className }` } title={ title }></li>
            );
        default:
            return (
                <li>
                    <a className={ className } href={ href || '#' } disabled={ disabled } onClick={ onClickHandler } title={ title }>
                        { children }
                    </a>
                </li>
            );
    }
};

export default MenuItem;
