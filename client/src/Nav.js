import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const TopNav = (props) => {
  return (
    <div>
      <Nav>
        <NavLink disabled href="#">Community Cares</NavLink>
        <NavLink href="#">Link</NavLink>
        <NavLink href="#">Another Link</NavLink>
        <NavLink disabled href="#">Disabled Link</NavLink>
      </Nav>
    </div>
  );
}

export default TopNav;
