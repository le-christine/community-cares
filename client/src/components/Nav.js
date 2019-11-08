import React from 'react';
import { Nav, NavLink } from 'reactstrap';

const TopNav = (props) => {
  return (
    <div>
      <Nav
        style={{backgroundColor:'#FBC02D'}}>
        <NavLink disabled href="#" style={{color:'white'}}>Community Cares</NavLink>
        <NavLink href="#" style={{float:'right'}}>Link</NavLink>
        <NavLink href="#">Another Link</NavLink>
        <NavLink disabled href="#">Disabled Link</NavLink>
      </Nav>
    </div>
  );
}

export default TopNav;
