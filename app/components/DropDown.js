import React, { PropTypes } from 'react';

const DropDown = ({
    children,
    className = '',
    inputClassName = '',
    dataListClassName = null,
    name = null,
    value = '',
    placeholder = null,
    listId,
    onInputChange = null
}) => {
    inputClassName += ' form-control'
    className += ' form-group'

    return (
        <div className={className}>
            <input
                 className={inputClassName}
                 type='text'
                 name={ name }
                 value={ value }
                 placeholder={ placeholder }
                 list={ listId }
                 onChange={ onInputChange }/>
            <datalist id={listId}>
                {children}
            </datalist>
        </div>
    )
};

DropDown.PropTypes = {
    children: PropTypes.object,
    className: PropTypes.string,
    dataListClassName: PropTypes.string,
    inputClassName: PropTypes.string,
    listId: PropTypes.string.isRequired,
    name: PropTypes.string,
    onInputChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string
};

export default DropDown;
