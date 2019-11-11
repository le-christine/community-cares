import React from 'react';
import Select from 'react-select';


const SearchComboBox = (props) => {
  const { selectedOption } = props.value;

  const customStyles = {
    container: (base) => ({
        ...base,
        width: 200,
        display:'inline-block',
        margin: 20
      }),
  }
    return (
      <Select
        value = {selectedOption}
        onChange={props.handleChange}
        options={props.options}
        styles={customStyles}
      />
    );
}

export default SearchComboBox;
