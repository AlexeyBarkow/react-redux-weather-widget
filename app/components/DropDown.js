import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';
import InputError from '../components/InputError';
import Input from '../components/Input';
import FormGroup from '../components/FormGroup';

function DropDown({
    children,
    className,
    inputClassName,
    dataListClassName,
    labelText,
    assistiveLabel,
    id,
    name,
    value,
    placeholder,
    listId,
    onChange,
    onBlur,
    onFocus,
    input,
    meta,
}) {
    const { error } = meta;
    return (
        <FormGroup meta={meta} className={className}>
            {
                labelText && id
                ? <label className={classnames(assistiveLabel && 'sr-only')} htmlFor={id}>{ labelText }</label>
                : undefined
            }
            <Input
              className={inputClassName}
              id={id}
              name={name}
              value={value}
              placeholder={placeholder}
              list={listId}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              {...input}
            />
            <datalist id={listId} className={dataListClassName}>
                { children }
            </datalist>
            { error && <InputError popupPanel errorMessage={error} /> }
        </FormGroup>
    );
}

DropDown.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    dataListClassName: PropTypes.string,
    inputClassName: PropTypes.string,
    listId: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    input: PropTypes.object,
    meta: PropTypes.object,
    id: PropTypes.string,
    labelText: PropTypes.string,
    assistiveLabel: PropTypes.bool,
};

DropDown.defaultProps = {
    children: null,
    className: '',
    dataListClassName: '',
    inputClassName: '',
    name: undefined,
    onChange: null,
    placeholder: '',
    value: undefined,
    id: undefined,
    onBlur: null,
    onFocus: null,
    input: {},
    meta: {},
    labelText: '',
    assistiveLabel: false,
};

export default DropDown;
