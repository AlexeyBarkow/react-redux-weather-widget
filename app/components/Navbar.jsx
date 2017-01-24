import React from 'react';
import Button from './Button.jsx';
import MenuItem from './MenuItem.jsx';
import ButtonGroup from './ButtonGroup.jsx';
import ButtonDropDown from '../containers/ButtonDropDown.jsx';

const Navbar = ({ children }) => {
  return (
    <nav>
      <ButtonGroup noPadding>
        <Button href='#' onClickHandler={ () =>{ console.log(2) } }>lorem</Button>
        <Button href='#' onClickHandler={ () =>{ console.log(3) } }>ipsum</Button>
        <ButtonDropDown value='qqqq'>
          <MenuItem onClickHandler={ () => { console.log(4) } }>dolor</MenuItem>
          <MenuItem onClickHandler={ () => { console.log(5) } }>sit</MenuItem>
        </ButtonDropDown>
      </ButtonGroup>
    </nav>
  );
};

export default Navbar;
