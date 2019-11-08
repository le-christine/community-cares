import React from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';

// Custom components
import SearchComboBox from './SearchComboBox';

import Background from '../media/bw-nyc-skyline.jpeg';
const ageGroups = [
  { value: 'Baby', label: 'Infant' },
  { value: 'Caregiver', label: 'Caregiver' },
  { value: 'Grade-schooler', label: 'Grade-schooler' },
  { value: 'Pre-scooler', label: 'Pre-schooler' },
  { value: 'Pre-teen', label: 'Pre-teenager' },
  { value: 'Teen', label: 'Teenager' },
  { value: 'Young adult', label: 'Young adult' },
];

const resources = [
  { value: 'cash & expenses', label: 'Financial Help' },
  { value: 'child care', label: 'Child Care' },
  { value: 'city ID card', label: 'City Identification' },
  { value: 'education', label: 'Education programs' },
  { value: 'enrichment', label: 'Enrichment programs' },
  { value: 'family services', label: 'Family services' },
  { value: 'food', label: 'Food' },
  { value: 'health', label: 'Health care' },
  { value: 'housing', label: 'Housing' },
  { value: 'people with disabilities', label: 'Disability help' },
  { value: 'work', label: 'Employment' },
];

//Values: everyone, children (0-13), families, immigrants, NYCHA residents, people with disabilities, pregnant & new parents, seniors, students, youth (14+), veterans
//Values: everyone, caregiver, baby, toddler, pre-schooler, grade-schooler, pre-teen, teen, young adult


const MainSearch = (props) => {
  return (
    <div>
      <Jumbotron fluid
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        paddingTop: '10%',
        paddingBottom: '10%'
      }}>
        <Container fluid
        style={{
          width: '80vw',
          paddingTop: '5%',
          paddingBottom: '5%',
          backgroundColor: 'rgba(196, 196, 196, 0.8)'
        }}>
          <h1
            className="display-3"
            style={{
              fontSize: '4em',
              display: 'inline-block'
            }}>I am a/an</h1>
          <SearchComboBox options={ageGroups}/>
          <h1
            className="display-3"
            style={{
              color: 'black',
              fontSize: '4em',
              display: 'inline-block'
            }}>searching for</h1>
          <SearchComboBox options={resources}/>

          <Button
            style = {{
              margin: '0 auto',
              border:'1px solid #EF5350',
              borderRadius: '50%',
              display: 'block',
              backgroundColor: '#EF5350'
            }}><i className="fas fa-search"></i></Button>
        </Container>
      </Jumbotron>

    </div>
  );
};

export default MainSearch;
