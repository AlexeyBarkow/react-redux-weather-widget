import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';

function ErrorMessage({ message, status, className }) {
    return (
        <div className={classnames(className, 'error-wrapper')}>
            { status && <h1>Error: { status }</h1> }
            <p>{ message }</p>
        </div>
    );
}

ErrorMessage.propTypes = {
    message: PropTypes.string,
    status: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    className: PropTypes.string,
};

ErrorMessage.defaultProps = {
    className: '',
    status: undefined,
    message: 'Something went wrong',
};

export default ErrorMessage;
