import React, { Component } from 'react';
import Select from 'react-select';

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: 'black',
    opacity: 1.0
  }),
  control: () => ({
    width: '200px'
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none'
  }),
  container: (base) => ({
    ...base,
    display:'inline-block',
    marginLeft: 20,
    paddingTop: 50
  }),
  singleValue: (provided, state) => {
    const opacity = 1 ;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

class SearchComboBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
    }
  };

  handleChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        styles={customStyles}
        value={selectedOption}
        onChange={this.handleChange}
        options={this.props.options}
      />
    );
  }
}

export default SearchComboBox;
