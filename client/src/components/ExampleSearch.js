import React from 'react';
import { Card, Button, CardTitle, CardText, Col } from 'reactstrap';

const ExampleSearch = (props) => {
  return (
      <Col xs="6" sm="4">
        <Card body>
          <CardTitle>{props.title}</CardTitle>
          <CardText>{props.text}</CardText>
          <Button color="info" onClick={props.onClick}>{props.title}</Button>
        </Card>
      </Col>
  );
};

export default ExampleSearch;
