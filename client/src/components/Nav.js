import React from 'react';
import { Nav, NavLink } from 'reactstrap';

const TopNav = (props) => {
  return (
    <div>
      <Nav
        style={{
          backgroundColor:'#FBC02D',
          display: 'flex',
          justifyContent: 'space-between'}}>
        <NavLink disabled href="#" style={{color:'white'}}>Community Cares</NavLink>
        <div style={{display: 'flex'}}>
        <div style={{padding:'.5rem'}}className="fb-share-button" data-href="http://community-cares-deploy.s3-website-us-east-1.amazonaws.com/" data-layout="button" data-size="large"><a rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fcommunity-cares-deploy.s3-website-us-east-1.amazonaws.com%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Share</a></div>
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
        </div>
      </Nav>
    </div>
  );
}

export default TopNav;
