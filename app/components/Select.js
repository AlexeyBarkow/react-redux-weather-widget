import React, { PropTypes } from 'react';

function Select({
    input,
    children,
    className,
    onChange,
    name,
    id,
    btnStyle,
    value,
}) {
    return (
        <div className={`${className} form-group`}>
            <select
              className={`${className}${btnStyle ? ' btn btn-default' : ''} form-control`}
              name={name}
              id={id}
              value={value}
              onChange={onChange}
              {...input}
            >
                { children }
            </select>
            <span className="caret" aria-hidden="true" />
        </div>
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
};

export default Select;
