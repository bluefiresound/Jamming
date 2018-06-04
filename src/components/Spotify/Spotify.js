const clientID = 'client_id=' + '1bdcc59a212346ae8ede92fbc2e9b607';
const clientSecret = 'd694a55f665c433db98ff8d489185cbd';
const authorizeQuery = 'https://accounts.spotify.com/authorize';
const responseTypeCode = 'response_type=code';
const responseTypeToken = 'response_type=token';
//const scope = 'scope=user-read-private%20user-read-email';
const scope = 'scope=playlist-modify-public%20playlist-modify-private';
const localUrl = 'http://localhost:3000/';
const redirectUri = 'redirect_uri=' + `${localUrl}`;

let accessToken;
let expiresIn;

//TO DO: gen random string for state later
//const state = '';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const authorizeUrl = `${authorizeQuery}?${clientID}&${redirectUri}&${scope}&${responseTypeToken}`;
    console.log("**** " + authorizeUrl);

    const url = window.location.href;
    const urlAccessToken = url.match(/access_token=([^&]*)/);
    const urlExpiresIn = url.match(/expires_in=([^&]*)/);
    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      expiresIn = urlExpiresIn[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;

    } else {
      window.location = authorizeUrl;
    }

  },

  async getUserId(accessToken) {
    console.log("*** get user id");

    const requestUrl = 'https://api.spotify.com/v1/me';
/*
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        //renderRawResponse(xhr.response);
        //renderResponse(xhr.response);
        console.log(xhr.resposne);
        alert(xhr.response);
        return xhr.response.json();
      }
    };

    xhr.open('GET', requestUrl);
    xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.send();
*/

    var headers = {
                    'Accept': 'application/json',
                    //'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    //'Access-Control-Allow-Origin': 'Content-Type', //`${localUrl}`,
                    'origin': 'https://developer.spotify.com',
                    'referer': 'https://developer.spotify.com/console/get-current-user/'
                  };
    const response = await fetch(requestUrl, {  method: 'GET',
                                                headers
                                              }
    );

    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const userId = jsonResponse.id;
      return userId;
      //alert(jsonResponse.id);
/*
    const jsonResponse = await response.json();
    console.log("666666666");
    console.log(jsonResponse);
    return jsonResponse;
*/

    } else {
      console.log('User ID Request Failed');
    }

  },

  async search(searchTerms) {
    const searchTermUri = encodeURI(searchTerms);
    const searchQuery = 'https://api.spotify.com/v1/search?q=' + `${searchTermUri}` + '&type=track';

    const accessToken = await Spotify.getAccessToken();

    const response = await fetch(searchQuery, {
                                                headers: {
                                                          Authorization: `Bearer ${accessToken}`
                                                        }
                                              });
    if (response.ok) {
        console.log('*** access token: ' + `${accessToken}`);
        //console.log(response.json());

        //console.log("*** " + renderRawResponse(response));

        const jsonResponse = await response.json();
        console.log(jsonResponse);
        if (jsonResponse.tracks) {
          const tracklist = jsonResponse.tracks.items.map(track => ({
                                                                      key: track.id,
                                                                      track: {
                                                                        key: track.id,
                                                                        TrackName: track.name,
                                                                        Artist: track.artists[0].name,
                                                                        Album: track.album.name
                                                                      }
                                                                    }));
          console.log("*** tracklist");
          console.log(tracklist);
          return tracklist;
        }
    }

    //dummy data (for testing)
    //return tracks; //{tracks: tracks};
  },

  async createPlaylist(playlistName, userId, accessToken) {
    const saveQuery = 'https://api.spotify.com/v1/users/' + userId + '/playlists';
    const data = JSON.stringify(  {
                                    'name': `${playlistName}`,
                                    'description': "New playlist description",
                                    'public' :false
                                  });
    const response = await fetch(saveQuery, {
                                                method: 'POST',
                                                headers: { Authorization: `Bearer ${accessToken}` },
                                                body: data
                                              });
    console.log(response);
    if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        console.log(`{playlist ${playlistName} is created, id: ${jsonResponse.id}}`);
        return jsonResponse.id;
    }
    return 0;
  },

  async addTracksToPlaylist(playlistId, userId, accessToken, trackIds) {
    //const addTrack = 'https://api.spotify.com/v1/users/' + userId + '/playlists';
    const addTrack = 'https://api.spotify.com/v1/users/' + `${userId}` + '/playlists/' + `${playlistId}` + '/tracks?' + `${trackIds}`;
    console.log('addTrackURL ' + addTrack);
    const data = JSON.stringify(  {

                                  });
    const response = await fetch(addTrack, {
                                                method: 'POST',
                                                headers: { Authorization: `Bearer ${accessToken}` },

                                              });
    console.log(response);
    if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        console.log(`{tracklist to add to ${playlistId}`);
        return jsonResponse.id;
    }
  },

  async save(playlist, playlistName) {
    let trackIds = 'uris=';
    const num = playlist.length;
    playlist.forEach( (x, index) => {
      trackIds += 'spotify%3Atrack%3A' + x.track.key;
      if (num !== index+1) {
        trackIds += '%2C';
      }
    });

    const accessToken = await Spotify.getAccessToken();
    console.log(`{access token: ${accessToken}}`);

    const userId = await Spotify.getUserId(accessToken);
    console.log(`userID: {${userId}}`);

    const playlistId = await Spotify.createPlaylist(playlistName, userId, accessToken, trackIds);
    if (playlistId) {
      const snapshotId = await Spotify.addTracksToPlaylist(playlistId, userId, accessToken, trackIds);
      if (snapshotId) {
        console.log(`{snapshotId: ${snapshotId.snapshot_id}}`);
        console.log(`{Successfully added ${num} tracks}`);
        return snapshotId.snapshot_id;
      }
    }

  }

}

export default Spotify;
