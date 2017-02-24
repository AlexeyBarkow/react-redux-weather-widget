import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';

function InputError({ className, errorMessage, popupPanel }) {
    return (
        <div>
            <span className={classnames(className, 'help-block', popupPanel && 'panel panel-danger')}>
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
