import React, { Component } from 'react';
import Select from 'react-select';


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
        value={selectedOption}
        onChange={this.handleChange}
        options={this.props.options}
      />
    );
  }
}

export default SearchComboBox;
