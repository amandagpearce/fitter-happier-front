import React from "react";
import YouTube from "react-youtube";
import classes from "./Video.module.css";

const Video = ({ yt_id, title }) => {
  const yt_opts = {
    height: "",
    width: "",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const onPlayerReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  return (
    <React.Fragment>
      <YouTube
        className={classes.yt_video}
        videoId={yt_id}
        opts={yt_opts}
        onReady={onPlayerReady}
      />
      <p className={classes.title}>{title}</p>
    </React.Fragment>
  );
};

export default Video;
