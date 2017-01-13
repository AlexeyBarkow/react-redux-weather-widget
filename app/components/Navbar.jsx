import React from 'react';

const getChildButtons = (parent, prefix, isFirst) => (
  <ul role="menu" className={ isFirst ? 'btn-group btn-group-justified' : 'dropdown-menu' }>
    {
      parent.map((curr, index) =>
          typeof curr.link === 'string' ?
            (
              <li role="presentation" key={ prefix + index } className="btn btn-default">
                <a role="button" className="stretch">{ curr.title }</a>
              </li>
            )
          :
            (
              <li role="presentation" key={ prefix + index } className="dropdown btn-group">
                <button className="dropdown-toggle btn btn-default">  { curr.title } <span className="caret"></span></button>
                { getChildButtons(curr.link, `${ prefix }${ index }-`) }
              </li>
            )
        )
    }
  </ul>
);


const Navbar = ({children, navButtons}) => {
  // const { nav } = props;
  console.log(navButtons);
  return (
    <nav className="navbar">
      { getChildButtons(navButtons, '', true) }
    </nav>
  );
};

export default Navbar;
