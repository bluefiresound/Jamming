import React from 'react';
import Track from '../Tracks/Track'

class TrackList extends React.Component {
  constructor(props) {
    super(props);

    this.handleTrackAction = this.handleTrackAction.bind(this);
  }

  handleTrackAction(selectedTrack) {
    console.log('(TrackList class) Track mode: ' + this.props.mode + ' Track: ' + `${selectedTrack.TrackName}`);
    this.props.onTrackAction(selectedTrack);    
  }

  render() {

    //console.log("&&&&&&&&&&&&&");
    /*
    console.log(this.props.tracks);
    if (this.props.tracks[0]) {
      console.log(this.props.tracks[0].key);
      console.log(this.props.tracks[0].track.TrackName);
    }
    */
/*
    if (this.props.tracks) {
      this.props.tracks.forEach( track => {
        console.log("key");
        console.log(track.key)
        console.log("track");
        console.log(track)
      });
      console.log("--------------------");
      const lala = this.props.tracks.map( track => {
        return `{<Track track=${track.track} key=${track.key} mode=${this.props.mode} onTrackAction=${this.handleTrackAction} />}`
      });
      console.log(lala);
      */
      /*
      const lala = this.props.tracks.map( track => {
        return `{${track.track} key=${track.key}}`
      })
      lala.forEach( track => {
        console.log("key " + `${track.key} ${track.track.TrackName}`);
      });

    }
*/

    console.log("*** tracklist");
    console.log(this.props.tracks);

    return (
      <div className="TrackList">
        {
          this.props.tracks.map( track => {
            return <Track track={track.track} mode={this.props.mode} onTrackAction={this.handleTrackAction} />
          })
        }
      </div>
    );
  }//end render()

}

export default TrackList;
