import React, { PropTypes } from 'react';

function InputError({ className, errorMessage, popupPanel }) {
    return (
        <div>
            <span className={`${className} help-block${popupPanel ? ' panel panel-danger' : ''}`}>
                { errorMessage }
            </span>
        </div>
    );
}

InputError.propTypes = {
    className: PropTypes.string,
    errorMessage: PropTypes.string.isRequired,
    popupPanel: PropTypes.bool,
};

InputError.defaultProps = {
    className: '',
    popupPanel: false,
};

export default InputError;
