import React, { PropTypes, Component } from 'react';
import classnames from 'classnames/dedupe';

class Input extends Component {
    render() {
        const {
            className,
            type,
            list,
            name,
            value,
            placeholder,
            onChange,
            onKeyPress,
            onBlur,
            onFocus,
            input,
            id,
        } = this.props;

        return (
            <input
              className={classnames('form-control', className)}
              type={type}
              name={name}
              value={value}
              id={id}
              placeholder={placeholder}
              list={list}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              onKeyPress={onKeyPress}
              {...input}
            />
        );
    }
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
    onKeyPress: PropTypes.func,
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
    onKeyPress: undefined,
};

export default Input;
