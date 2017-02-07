import React, { PropTypes } from 'react';

function DropDown({
    children,
    className,
    inputClassName,
    dataListClassName,
    name,
    value,
    placeholder,
    listId,
    onInputChange,
    errorBlock,
    onBlur,
    validationState,
}) {
    return (
        <div className={`${className} form-group ${validationState}`}>
            <input
              className={`${inputClassName} form-control`}
              type="text"
              name={name}
              value={value}
              placeholder={placeholder}
              list={listId}
              onChange={onInputChange}
              onBlur={onBlur}
            />
            <datalist id={listId} className={dataListClassName}>
                { children }
            </datalist>
            { validationState === 'has-error' && errorBlock }
        </div>
    );
}

DropDown.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    dataListClassName: PropTypes.string,
    inputClassName: PropTypes.string,
    listId: PropTypes.string.isRequired,
    name: PropTypes.string,
    onInputChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    errorBlock: PropTypes.element,
    onBlur: PropTypes.func,
    validationState: PropTypes.string,
};

DropDown.defaultProps = {
    children: null,
    className: '',
    dataListClassName: '',
    inputClassName: '',
    name: '',
    onInputChange: null,
    placeholder: '',
    value: '',
    errorBlock: null,
    onBlur: null,
    validationState: '',
};

export default DropDown;
