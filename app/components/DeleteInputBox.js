import React, { PropTypes } from 'react';
import classnames from 'classnames/dedupe';
import Button from './Button';

function DeleteInputBox({ className, deleteHandler, children }) {
    return (
        <Button onClickHandler={deleteHandler} primary className={classnames(className, 'delete-box')}>
            <span className="close">×</span>
            { children }
        </Button>
    );
}

DeleteInputBox.propTypes = {
    className: PropTypes.string,
    deleteHandler: PropTypes.func.isRequired,
    children: PropTypes.node,
};

DeleteInputBox.defaultProps = {
    className: '',
    children: null,
};

export default DeleteInputBox;
