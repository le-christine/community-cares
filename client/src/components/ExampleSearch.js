import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

const ExampleSearch = (props) => {
  return (
    <Row>
      <Col xs="6" sm="4">
        <Card body>
          <CardTitle>Special Title Treatment</CardTitle>
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Button color="info">Go somewhere</Button>
        </Card>
      </Col>
      <Col xs="6" sm="4">
        <Card body>
          <CardTitle>Special Title Treatment</CardTitle>
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Button color="info">Go somewhere</Button>
        </Card>
      </Col>
      <Col xs="6" sm="4">
        <Card body>
          <CardTitle>Special Title Treatment</CardTitle>
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Button color="info">Go somewhere</Button>
        </Card>
      </Col>
    </Row>
  );
};

export default ExampleSearch;
