import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';
import FormGroup from './FormGroup';

function CustomInput({
    className,
    children,
    value,
    name,
    id,
    checked,
    onChange,
    buttonStyle,
    defaultChecked,
    type,
    input,
    noControl,
}) {
    return (
        <FormGroup className={className}>
            <input
                defaultChecked={defaultChecked}
                checked={checked || value === true}
                type={type}
                name={name}
                value={value}
                id={id}
                onChange={onChange}
                {...input}
            />
            <label className={classnames(!noControl && 'form-control', buttonStyle && 'btn btn-default')} htmlFor={id}>{ children }</label>
        </FormGroup>
    );
}

CustomInput.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func,
    buttonStyle: PropTypes.bool,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    type: PropTypes.string.isRequired,
    input: PropTypes.object,
    noControl: PropTypes.bool,
};

CustomInput.defaultProps = {
    className: '',
    name: undefined,
    value: undefined,
    children: null,
    onChange: undefined,
    buttonStyle: false,
    checked: undefined,
    defaultChecked: undefined,
    input: {},
    noControl: false,
};

export default CustomInput;
