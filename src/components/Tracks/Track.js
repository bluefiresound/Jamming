import React from 'react';



class Track extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.mode === 'SEARCH RESULTS') {
      this.trackAction = '+';
    } else {
      this.trackAction = '-';
    }

    this.handleTrackAction = this.handleTrackAction.bind(this);
  }

  handleTrackAction() {
    //console.log('(Track class) Track mode: ' + this.props.mode + ' Track: ' + `${this.props.track.TrackName} ${this.props.key} ${this.props.track.key}` );
    //console.log(this.props);
    this.props.onTrackAction( this.props.track);
    /*
    this.props.onTrackAction( {
                                key: this.props.track.key,
                                track: this.props.track
                              });
                              */
  }

  render() {
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>{`${this.props.track.TrackName}`}</h3>
          <p>{`${this.props.track.Artist} | ${this.props.track.TrackName}`}</p>
        </div>
        <a className="Track-action" onClick={this.handleTrackAction} >{`${this.trackAction}`}</a>
      </div>

    );
  } //ender render()

}

export default Track;
