import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';

function ErrorMessage({ message, status, className }) {
    return (
        <div className={classnames(className, 'error-wrapper')}>
            <h1>Error: { status }</h1>
            <p>{ message }</p>
        </div>
    );
}

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
    status: PropTypes.number,
    className: PropTypes.string,
};

ErrorMessage.defaultProps = {
    className: '',
    status: '',
};

export default ErrorMessage;
