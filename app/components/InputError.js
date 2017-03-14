import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';

function InputError({ className, errorMessage, popupPanel }) {
    return (
        <div className={classnames(className, popupPanel ? 'help-popup-block' : 'help-block', 'panel panel-danger')}>
            { errorMessage }
        </div>
    );
}

InputError.propTypes = {
    className: PropTypes.string,
    errorMessage: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]).isRequired,
    popupPanel: PropTypes.bool,
};

InputError.defaultProps = {
    className: '',
    popupPanel: false,
};

export default InputError;
