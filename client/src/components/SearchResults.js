import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';


class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numResults: 3,
      searchTerms: ['one', 'two'],
      results: [
        {
          test: '1st result'
        },
        {
          test: '2nd result'
        },
        {
          test: '3rd result'
        }
      ]
    };
  }

  render() {
    return (
      <Container>
      <h3>{this.state.numResults} RESULTS FOR
          {this.state.searchTerms.map(term => {
            return ' ' + term + ' '
          })}
      </h3>
      {this.state.results.map(displayResult => {
        return (
          <Row>
            <Col>

            <p>{displayResult.test}</p>
            </Col>
          </Row>
        )
      })}
      </Container>
    )
  }
}

export default SearchResults;
