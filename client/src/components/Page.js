import React, { Component } from 'react';

// Custom components
import TopNav from './Nav';
import ExampleSearch from './ExampleSearch';
import MainSearch from './MainSearch';
import SearchResults from './SearchResults';
import Footer from './Footer';

class Page extends Component {
  render() {
    return (
      <div>
        <TopNav/>
        <MainSearch/>
        <ExampleSearch/>
        <SearchResults/>
        <Footer/>
      </div>
    )
  }
}

export default Page;
