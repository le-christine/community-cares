import React, { Component } from 'react';
import { Row, Spinner } from 'reactstrap';


// Custom components
import TopNav from './Nav';
import ExampleSearch from './ExampleSearch';
import MainSearch from './MainSearch';
import SearchResults from './SearchResults';
import Footer from './Footer';

import examples from '../data/examples';

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      dataFetchStatus: false,
      dataFetchError: false,
      dataFetchClicked : false,
      results: [],
      ageGroup: '',
      resource: ''
    }
  }

  getOpenData = (fetchUrl) => {
    fetch(fetchUrl)
    .then(res => res.json())
    .then((res) => {
      console.log(res);
      this.setState({
        dataFetchStatus: true,
        results: res
      })
    })
    .catch((err) => {
      this.setState({ dataFetchError: true});
      console.log(err);
    })
  }

  changedataFetchClicked = () => {
    this.setState({ dataFetchClicked : true })
  }

  render() {
    return (
      <div>
        <TopNav/>
        <MainSearch/>
        <h2>Check out these examples</h2>
        <Row>
        {examples.map((query, index) =>
          <ExampleSearch
            key={index}
            title={query.title}
            text={query.text}
            onClick={() => {this.getOpenData(query.fetchUrl); this.changedataFetchClicked()}}/>
        )}
        </Row>
        {this.state.dataFetchClicked ? this.state.dataFetchStatus ?
          this.state.results.map((result, index) => {
            return (
            <SearchResults result={result}/>
            )
          }) :
          <Spinner style={{ width: '3rem', height: '3rem' }} />
          : ' ' }

        <Footer/>
      </div>
    )
  }
}

export default Page;
