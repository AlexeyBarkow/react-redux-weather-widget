import React from 'react';

const ButtonGroup = ({ children, justified, noPadding = false }) => {
    return (
        <ul className={ `btn-toolbar${ justified ? ' btn-group-justified' : '' }${ noPadding ? ' no-list-padding' : '' }` }>
            { children }
        </ul>
    );
};

export default ButtonGroup;
