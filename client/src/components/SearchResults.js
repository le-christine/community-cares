import React from 'react';
import { Container, Row, Col, Button, Badge } from 'reactstrap';


const SearchResults = (props) => {
    const populationServed = props.result.population_served.split(',').map((population, index) => {
      return (
        <Badge key = {index} style={{marginRight:'1%'}} color="warning">{population}</Badge>
      )
    })

    return (
      <Container
      style = {{
        backgroundColor: 'white',
        minHeight: '20vh',
        marginTop: '2%',
        textAlign: 'left'
      }}>
      <Row>
        <Col>
        <h3>{props.result.program_name}</h3>
        <Badge style={{marginRight:'1%'}} color="secondary">{props.result.program_category}</Badge>
        { populationServed }
        <p>{props.result.program_description.replace(/&nbsp;/g,' ').trim()}</p>
        </Col>

        <div style = {{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>

          {props.result.url_of_online_application ?
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
            :
            <a href = {props.result.url_of_pdf_application_forms} target="_blank" rel="noopener noreferrer">
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
          }
          {!props.userSavedResults.includes(`\"${props.result.unique_id_number}\"`, 0) ?
          <Button
            onClick = {(e) => {
              props.addResourceToDb(props.result.unique_id_number,props.result.program_category);
              }}
            color="info"
            style={{
            height: '3em',
            width: '3em',
            borderRadius: '50%'}}>
            <i className="fas fa-plus"></i>
            </Button> :
            <Button
              onClick = {(e) => {
                props.deleteResourceToUser(props.result.unique_id_number, props.result.program_category);
              }}
              color="secondary"
              style={{
              height: '3em',
              width: '3em',
              borderRadius: '50%'}}>
              <i className="fas fa-minus"></i>
              </Button>
          }
        </div>
      </Row>

      </Container>
    )
}


export default SearchResults;
