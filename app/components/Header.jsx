import React from 'react';
import css from '../styles/header.scss';

const Header = ({children}) => (
  <header className="container header">
    <div className="line-up row">
      <figure className="header__logo text-center col-sm-3">
        <img src='http://placehold.it/150x150' alt='logo'/>
        <figcaption>lorem ipsum</figcaption>
      </figure>
      <div className="col-sm-9">
        {children}
      </div>
    </div>
  </header>
);

export default Header;
