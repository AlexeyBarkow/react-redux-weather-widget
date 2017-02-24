import React, { PropTypes } from 'react';

function FormGroup({ className, children, meta: { touched, error } }) {
    let validationStatus = '';
    if (touched) {
        if (error) {
            validationStatus = ' has-error';
        } else {
            validationStatus = ' has-success';
        }
    }
    return (
        <div className={`${className} form-group${validationStatus}`}>
            { children }
        </div>
    );
}

FormGroup.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    meta: PropTypes.object,
};

FormGroup.defaultProps = {
    className: '',
    meta: {},
};

export default FormGroup;
