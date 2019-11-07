import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
import SearchComboBox from './SearchComboBox';

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
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">I am a/an</h1>
          <SearchComboBox options={ageGroups}/>
          <h1 className="display-3">searching for</h1>
          <SearchComboBox options={resources}/>
        </Container>
      </Jumbotron>

    </div>
  );
};

export default MainSearch;
