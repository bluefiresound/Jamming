import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
  }

  handleSearch(event) {
    this.props.searchSpotify(this.searchTerm);
    console.log("*** SEARCH: " + this.searchTerm);
  }

  handleSearchTermChange(event) {
    this.searchTerm = event.target.value;
    console.log("*** Search TERM CHANGE: " + event.target.value);
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song Title" onChange={this.handleSearchTermChange} />
        <a onClick={this.handleSearch} >SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
