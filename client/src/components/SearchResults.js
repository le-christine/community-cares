import React from 'react';
import { Container, Row, Col } from 'reactstrap';


const SearchResults = (props) => {
    return (
      <Container>
      <h3>{props.result.program_name}</h3>
      <Row>
        <Col>
        <p>{props.result.program_description}</p>
        </Col>
      </Row>
      
      </Container>
    )
}


export default SearchResults;
