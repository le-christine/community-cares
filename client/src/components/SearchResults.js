import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';


const SearchResults = (props) => {
    return (
      <Container
      style = {{
        backgroundColor: 'white',
        height: '20vh',
        marginTop: '2%',
        overflow: 'auto',
        textAlign: 'left'
      }}>
      <Row>
        <Col>
        <h3>{props.result.program_name}</h3>
        <p>{props.result.program_description.replace(/&nbsp;/g,' ').trim()}</p>
        </Col>

        <div style = {{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <a href = {props.result.url_of_online_application} target="_blank" rel="noopener noreferrer">
          <Button
          style = {{
            borderRadius: '50%',
            height: '3em',
            width: '3em',
            border: 'none',
            backgroundColor: '#EF5350'}}
            >
            <i className="fas fa-arrow-right"></i>
          </Button></a>
          <Button color="info" style={{
            height: '3em',
            width: '3em',
            borderRadius: '50%'}}>
            <i className="fas fa-plus"></i>
            </Button>
        </div>
      </Row>

      </Container>
    )
}


export default SearchResults;
