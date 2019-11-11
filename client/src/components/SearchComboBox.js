import React from 'react';
import Select from 'react-select';


const SearchComboBox = (props) => {
  const { selectedOption } = props.value;
    return (
      <Select
        value = {selectedOption}
        onChange={props.handleChange}
        options={props.options}
      />
    );
}

export default SearchComboBox;
