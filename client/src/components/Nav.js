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
        <NavLink disabled href="#" style={{color:'gray', fontSize: '25px', textShadow: '1px 1px #fff'}}><b>Community Cares</b></NavLink>
        <div style={{display: 'flex'}}>
        <div style={{padding:'.5rem', margin: 'auto 0'}} className="fb-share-button" data-href="http://community-cares-deploy.s3-website-us-east-1.amazonaws.com/" data-layout="button" data-size="large"><a rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fcommunity-cares-deploy.s3-website-us-east-1.amazonaws.com%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Share</a></div>
        {props.loggedInStatus ?
        <NavLink
          href="#"
          onClick = {props.getUserSavedResources}>
          View saved resources</NavLink>
        :
        <div
          style = {{
            display:'flex', alignItems: 'center'}}>
        <i style={{color:'white', margin: '0.7rem 0'}} className="far fa-user-circle"></i>
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
