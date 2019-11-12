import React from 'react';

function Footer() {
  return (
    <div style={{display: 'flex', flexDirection:'column'}}>
      <div style={{padding: '3%', backgroundColor:'#FBC02D', display:'flex', justifyContent: 'space-between'}}>
      <div style={{width: '40vw', textAlign: 'left'}}>
        <h4>About</h4>
        <p>Community Cares aims to foster the relationship between people and government.
        Based on user's query, it delivers information about free resources in New York City. Data is provided
        by the NYC Open Data Benefits and Programs API.</p>
      </div>
      <div style={{width: '30vw', textAlign: 'left'}}>
        <h4>Links</h4>
        <a href="https://opendata.cityofnewyork.us/" target="_blank" rel="noopener noreferrer">NYC Open Data</a><br/>
        <a href="https://en.wikipedia.org/wiki/Civic_technology" target="_blank" rel="noopener noreferrer">What is civic tech?</a><br/>
      </div>
      <div style={{width: '30vw',textAlign: 'left'}}>
        <h4>Disclaimer</h4>
        <p>Last updated: November 11, 2019</p>
        <p>Community Care is for general information purposes only.</p>
      </div>
      </div>
      <div style={{backgroundColor: '#FBC02D'}}>
        <h5>Made by Christine Le</h5>
          <a style={{color: 'black'}} href="https://github.com/le-christine" target="_blank" rel="noopener noreferrer">
          <i style={{fontSize: '2em'}} className="fab fa-github-square"></i></a>
      </div>
    </div>
  )
}

export default Footer;
