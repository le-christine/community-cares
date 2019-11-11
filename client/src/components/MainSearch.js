import React from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';

// Custom components
import SearchComboBox from './SearchComboBox';

import Background from '../media/bw-nyc-skyline.jpeg';
const ageGroups = [
  { value: 'everyone', label: 'Adult'},
  { value : 'students', label: 'Student'},
  { value: 'parents', label: 'Parent' },
  { value: 'Pre-teen', label: 'Pre-teenager' },
  { value: 'Teen', label: 'Teenager' },
  { value: 'Young adult', label: 'Young adult' },
  { value: 'Veteran', label: 'Veteran'},
  { value: 'immigrants', label: 'Immigrant'}
];


const resources = [
  { value: 'Cash & expenses', label: 'Financial Help' },
  { value: 'Child Care', label: 'Child Care' },
  { value: 'City ID Card', label: 'City Identification' },
  { value: 'Education', label: 'Education programs' },
  { value: 'Enrichment', label: 'Enrichment programs' },
  { value: 'Family services', label: 'Family services' },
  { value: 'Food', label: 'Food' },
  { value: 'Health', label: 'Health care' },
  { value: 'Housing', label: 'Housing' },
  { value: 'People with Disabilities', label: 'Disability help' },
  { value: 'Work', label: 'Employment' },
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
          <SearchComboBox
            value = {props.ageValue}
            handleChange = {props.handleAgeGroupQueryChange}
            options={ageGroups}
            />
          <h1
            className="display-3"
            style={{
              color: 'black',
              fontSize: '4em',
              display: 'inline-block'
            }}>searching for</h1>
          <SearchComboBox
            value = {props.programValue}
            handleChange = {props.handleResourceQueryChange}
            options={resources}
          />

          <Button
            style = {{
              margin: '0 auto',
              border:'1px solid #EF5350',
              borderRadius: '50%',
              display: 'block',
              backgroundColor: '#EF5350'
            }}
            onClick = {props.fetchCustomQuery}><i className="fas fa-search"></i></Button>
        </Container>
      </Jumbotron>

    </div>
  );
};

export default MainSearch;
