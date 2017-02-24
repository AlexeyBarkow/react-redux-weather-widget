import React, { PropTypes } from 'react';

function Input({
    className,
    type,
    list,
    name,
    value,
    placeholder,
    onChange,
    onBlur,
    onFocus,
    input,
    id,
}) {
    return (
        <input
          className={`form-control ${className}`}
          type={type}
          name={name}
          value={value}
          id={id}
          placeholder={placeholder}
          list={list}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          {...input}
        />
    );
}

Input.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    list: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    input: PropTypes.object,
};

Input.defaultProps = {
    className: '',
    type: 'text',
    placeholder: undefined,
    list: undefined,
    name: undefined,
    value: undefined,
    id: undefined,
    onChange: undefined,
    onBlur: undefined,
    onFocus: undefined,
    input: {},
};

export default Input;
