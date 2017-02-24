import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';
import FormGroup from './FormGroup';

function Radio({
    className,
    children,
    value,
    name,
    id,
    onChange,
    buttonStyle,
    checked,
    defaultChecked,
}) {
    return (
        <FormGroup className={className}>
            {
                defaultChecked
                ? <input defaultChecked={defaultChecked} type="radio" name={name} value={value} id={id} onChange={onChange} />
            : <input checked={checked} type="radio" name={name} value={value} id={id} onChange={onChange} />
            }
            <label className={classnames('form-control', buttonStyle && 'btn btn-default')} htmlFor={id}>{ children }</label>
        </FormGroup>
    );
}

Radio.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    value: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    buttonStyle: PropTypes.bool,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
};

Radio.defaultProps = {
    className: '',
    value: '',
    children: null,
    onChange: null,
    buttonStyle: false,
    checked: null,
    defaultChecked: null,
};

export default Radio;
