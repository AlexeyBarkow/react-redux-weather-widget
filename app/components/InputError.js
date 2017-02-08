import React, { PropTypes } from 'react';

function InputError({ className, errorMessage }) {
    return (
        <div>
            <span className={`${className} help-block`}>
                { errorMessage }
            </span>
        </div>
    );
}

InputError.propTypes = {
    className: PropTypes.string,
    errorMessage: PropTypes.string.isRequired,
};

InputError.defaultProps = {
    className: '',
};

export default InputError;
