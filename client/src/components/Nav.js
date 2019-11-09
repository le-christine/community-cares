import React from 'react';
import { Nav, NavLink } from 'reactstrap';

const TopNav = (props) => {
  return (
    <div>
      <Nav
        style={{backgroundColor:'#FBC02D'}}>
        <NavLink disabled href="#" style={{color:'white'}}>Community Cares</NavLink>

        {props.loggedInStatus ?
        <NavLink
          href="#"
          onClick = {props.getUserSavedResources}>
          View saved resources</NavLink>
        :
        <div
          style = {{
            display:'flex'}}>
        <i style={{color:'white', margin: 'auto'}} className="far fa-user-circle"></i>
        <NavLink
          style={{padding:'.5rem'}}
          href="#"
          onClick = {props.handleLogInClick} >Log in</NavLink>
        <NavLink
          href="#"
          onClick= {props.handleSignUpClick}>Sign Up</NavLink>
        </div>
        }
      </Nav>
    </div>
  );
}

export default TopNav;
