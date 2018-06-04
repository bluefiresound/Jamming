import React from 'react';
import Spotify from '../Spotify/Spotify'

import TrackList from '../Tracks/TrackList'

let tracks = [];
let playlistName = '';

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.state =  {
                    playlistName: 'New Playlist',
                    tracklist: tracks
                  };

    this.handlePlaylistNameChange = this.handlePlaylistNameChange.bind(this);
    this.handlePlaylistSave = this.handlePlaylistSave.bind(this);
    this.handleTrackAction = this.handleTrackAction.bind(this);
  }

  handlePlaylistNameChange(event) {
    this.setState( { playlistName: event.target.value } );
    playlistName = event.target.value;
    console.log("*** PlaylistNameChange: " + event.target.value);
  }

  handlePlaylistSave(event) {
    console.log("*** PlaylistSave");
    const snapshotId = Spotify.save(tracks, playlistName);
    if (snapshotId) {
      tracks = [];
    }
  }

  updateTrackList() {
    //check for duplicates
    if (this.props.trackToAdd) {
      /*
      console.log('Playlist tracks');
      console.log(tracks);
      console.log('trackToAdd');
      console.log(this.props.trackToAdd);
      */

      const currTrack = this.props.trackToAdd;
      const isDup = tracks.some( x => {
        if (x.track.key === currTrack.key ) {
          return true;
        }
      });

      if (!isDup) {
        tracks.push({track: this.props.trackToAdd});
        this.setState(  {
                          tracklist: tracks
                        });
        console.log('playlist');
        console.log(tracks);

      } else {
          //alert(`{The track, ${this.props.trackToAdd.TrackName} has already been added}`)
      }

    }
  }

  handleTrackAction(selectedTrack) {
    console.log("remove ");
    console.log(selectedTrack);
    console.log(tracks);

    const index = tracks.findIndex( x => {
      if (x.track.key === selectedTrack.key) {
        return x;
      }
    });

    if (index) {
      console.log("*** REMOVING: " + index);
      tracks.splice(index, 1);

    }
    //console.log(this);

    this.setState(  {
                      tracklist: tracks
                    });


    console.log(tracks);
  }

  render() {
    this.updateTrackList();

    console.log('Playlist tracks');
    console.log(tracks);

    return (
      <div className="Playlist">
        <input placeholder='Playlist Name' onChange={this.handlePlaylistNameChange} value={this.state.playlistName} />

        <TrackList tracks={this.state.tracklist} onTrackAction={this.handleTrackAction} />

        <a className="Playlist-save" onClick={this.handlePlaylistSave} >SAVE TO SPOTIFY</a>
      </div>
    );
  }

}

export default Playlist;
