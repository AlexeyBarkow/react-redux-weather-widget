import React, { PropTypes } from 'react';

function ErrorMessage({ message, status, className }) {
    return (
        <div className={`${className} error-wrapper`}>
            <h1>Error: { status }</h1>
            <p>{ message }</p>
        </div>
    );
}

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    className: PropTypes.string,
};

ErrorMessage.defaultProps = {
    className: '',
};

export default ErrorMessage;
