import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../Spotify/Spotify'

let tracklist;

class App extends React.Component {
  constructor(props) {
    super(props);

    //init state
    this.state = {
      tracklist: [],
      trackToAdd: ''
    };

    this.searchSpotify = this.searchSpotify.bind(this);
    this.handleTrackAdd = this.handleTrackAdd.bind(this);
  }

  searchSpotify(term) {
    Spotify.search(term).then( tracks => {
      tracklist = tracks;
      this.setState( {
                      tracklist: tracks,
                    });
    });
  }

  handleTrackAdd(selectedTrack) {
    console.log('App (trackAction ADD): ' + `${selectedTrack.TrackName}`);
    if (selectedTrack) {
      //console.log(selectedTrack);
      //trackToAdd = selectedTrack;
      //playlist.push( selectedTrack );
      /*
      console.log("App --> track to add");
      console.log(trackToAdd);
      */
      this.setState( {
                      trackToAdd: selectedTrack
                    });
    }
  }

  render() {
    return (
      <div className="App">

        <SearchBar searchSpotify={this.searchSpotify} />

        <div className="App-playlist" >
            <SearchResults tracks={this.state.tracklist} onTrackAdd={this.handleTrackAdd} />
            <Playlist playlist={this.state.playlist} trackToAdd={this.state.trackToAdd} />
        </div>

      </div>
    );
  }

}

export default App;
