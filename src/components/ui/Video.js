import React from "react";
import YouTube from "react-youtube";
import classes from "./Video.module.css";
import Button from "./Button";

const Video = ({ yt_id, title, editMode, id }) => {
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

  const onDeleteVideo = () => {
    console.log("delete video id", id);
  };

  return (
    <React.Fragment>
      {editMode && (
        <Button title="deleteVideo" onClick={() => onDeleteVideo(id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
          </svg>
        </Button>
      )}
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
