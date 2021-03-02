import SpotifyPlayer from "react-spotify-web-playback";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
var Spotify = require("spotify-web-api-js");
var s = new Spotify();

const Player = (props) => {
  const { accessToken, queue, user, localUser, initialTrUri } = props; 
  const [deviceId, setDeviceId] = useState('');
  // const [playerQueue, setPlayerQueue] = useState([]);
  
  useEffect(() => {
    if (accessToken) {
      s.setAccessToken(accessToken)
    }
  }, [accessToken]);

  useEffect(() => {
    queue.map((e, i) => {
      if(i === 0) {
        return s.play({deviceId, uris: e.trUri})
      } else {
        return s.queue(e.trUri);
      }
    })
  }, [deviceId])

  console.log(queue)
  return (
    <section>
      <SpotifyPlayer
        // callback={state => {
        //   if(!state.isPlaying) {
        //     state.nextTracks = queue.map(e => e.trUri)
        //     console.log(state)
        //     state.isPlaying = true
        //   }
        // }}
        className="player"
        name="Desktop DJ Player"
        token={accessToken}
        uris={ localUser.playlist_uri }
        syncExternalDevice='true'
        persistDeviceSelection='true'
        autoPlay='false'
        initialVolume={0.5}
        styles={{
          bgColor: "#246A73",
          sliderColor: "#246A73",
          color: "#F3DFC1",
          trackNameColor: "#F3DFC1",
          loaderColor: "#246A73",
          activeColor: "red",
          sliderHandleColor: "#F3DFC1",
          sliderColor: "#F3DFC1",
        }}
      />
    </section>
  );
};

const mapStateToProps = (reduxState) => ({
  accessToken: reduxState.userReducer.accessToken,
  user: reduxState.userReducer.user,
  localUser: reduxState.userReducer.localUser
});

export default connect(mapStateToProps)(Player);
