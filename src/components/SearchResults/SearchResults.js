import React from 'react';
import TrackList from '../Tracks/TrackList'



class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.handleTrackAction = this.handleTrackAction.bind(this);
  }

  handleTrackAction(selectedTrack) {
    console.log('(SearchResults) (trackAction ADD): ' + `${selectedTrack.TrackName}`);
    this.props.onTrackAdd(selectedTrack);
  }

  render() {
    return(
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.tracks} mode="SEARCH RESULTS" onTrackAction={this.handleTrackAction} />
      </div>

    );
  } //end render()

}

export default SearchResults;
