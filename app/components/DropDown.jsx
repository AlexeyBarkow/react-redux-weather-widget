import React from 'react';

const DropDown = ({ children, className = '', inputClassName = '', dataListClassName = null, name = null, value = '', placeholder = null, listId, onChange = null }) => {
  inputClassName += ' form-control'
  className = ' form-group'

  return (
    <div className={ className }>
      <input className={ inputClassName } type='text' name={ name } value={ value } placeholder={ placeholder } list={ listId } onChange={ onChange } />
      <datalist id={ listId }>
        { children }
      </datalist>
    </div>
  )
};

export default DropDown;
