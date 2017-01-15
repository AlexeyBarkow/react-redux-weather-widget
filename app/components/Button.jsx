import React from 'react';

const Button = ({ children, onClickHandler = null, className = '', href = null, disabled = false }) => {
    const classesToPass = `btn btn-default ${ className }`;
    return (
        href ?
        <a disabled={ !!disabled } className={ classesToPass } href={ href } onClick={ onClickHandler }>{ children }</a>
        :
        <button disabled={ !!disabled } className={ classesToPass } onClick={  onClickHandler }>{ children }</button>
    );
};

export default Button;
