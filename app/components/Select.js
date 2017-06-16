import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';
import FormGroup from './FormGroup';

function Select({
    input,
    children,
    className,
    onChange,
    name,
    id,
    btnStyle,
    value,
    labelText,
    assistiveLabel,
}) {
    return (
        <FormGroup className={className}>
            {
                labelText && id
                ? <label className={classnames(assistiveLabel && 'sr-only')} htmlFor={id}>{ labelText }</label>
                : undefined
            }
            <select
                className={classnames(btnStyle && 'btn btn-default', 'form-control')}
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                {...input}
            >
                { children }
            </select>
            <span className="caret" aria-hidden="true" />
        </FormGroup>
    );
}

Select.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    id: PropTypes.string,
    btnStyle: PropTypes.bool,
    value: PropTypes.string,
    input: PropTypes.object,
    labelText: PropTypes.string,
    assistiveLabel: PropTypes.bool,
};

Select.defaultProps = {
    children: null,
    className: '',
    onChange: null,
    name: null,
    id: null,
    btnStyle: false,
    value: undefined,
    input: {},
    labelText: '',
    assistiveLabel: false,
};

export default Select;
