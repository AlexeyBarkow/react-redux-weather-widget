import React, { PropTypes } from 'react';
import Button from './Button';

function PaginationItem({ children, className, onClickHandler }) {
    return (
        <li className={className}>
            <Button
              href="#"
              noDefaultStyles
              preventDefaultAnyway
              onClickHandler={onClickHandler}
            >{ children }</Button>
        </li>
    );
}

PaginationItem.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClickHandler: PropTypes.func,
};

PaginationItem.defaultProps = {
    className: undefined,
    onClickHandler: undefined,
};

export default PaginationItem;
