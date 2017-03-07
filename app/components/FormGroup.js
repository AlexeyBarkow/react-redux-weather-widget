import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';

function FormGroup({
    className,
    children,
    meta: { touched, error },
    alwaysTouched,
    showWhenFocusout,
}) {
    let validationStatus = '';
    if (touched || alwaysTouched) {
        if (error) {
            validationStatus = 'has-error';
        } else {
            validationStatus = 'has-success';
        }
    }
    return (
        <div className={classnames(className, 'form-group', showWhenFocusout && 'show-always', validationStatus)}>
            { children }
        </div>
    );
}

FormGroup.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    meta: PropTypes.object,
    alwaysTouched: PropTypes.bool,
    showWhenFocusout: PropTypes.bool,
};

FormGroup.defaultProps = {
    className: '',
    meta: {},
    alwaysTouched: false,
    showWhenFocusout: false,
};

export default FormGroup;
