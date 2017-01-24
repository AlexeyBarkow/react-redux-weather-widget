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
}) {
    return (
        <div className={`${className} form-group`}>
            <input
              className={`${inputClassName} form-control`}
              type="text"
              name={name}
              value={value}
              placeholder={placeholder}
              list={listId}
              onChange={onInputChange}
            />
            <datalist id={listId} className={dataListClassName}>
                {children}
            </datalist>
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
};

export default DropDown;
