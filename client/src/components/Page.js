import React, { Component } from 'react';
import { Row } from 'reactstrap';


// Custom components
import TopNav from './Nav';
import ExampleSearch from './ExampleSearch';
import MainSearch from './MainSearch';
import SearchResults from './SearchResults';
import Footer from './Footer';

import examples from '../data/examples';

let queryExamples = examples.map((query, index) =>
  <ExampleSearch title={query.title} text={query.text}/>
);

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      dataFetchStatus: false,
      results: [],
      ageGroup: '',
      resource: ''
    }
  }

  render() {
    return (
      <div>
        <TopNav/>
        <MainSearch/>
        <h2>Check out these examples</h2>
        <Row>
          {queryExamples}
        </Row>
        <SearchResults/>
        <Footer/>
      </div>
    )
  }
}

export default Page;
