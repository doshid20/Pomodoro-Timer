import React from "react";
import PropTypes from "prop-types";
import classNames from "../utils/class-names";

function TimeControl(props) {
  const {
    playPause,
    handleStopButton,
    isSessionActive,
    isTimerRunning,
  } = props;
  return (
    <div
      className="btn-group btn-group-lg mb-2"
      role="group"
      aria-label="Timer controls"
    >
      <button
        type="button"
        className="btn btn-primary"
        data-testid="play-pause"
        title="Start or pause timer"
        onClick={playPause}
      >
        <span
          className={classNames({
            oi: true,
            "oi-media-play": !isTimerRunning,
            "oi-media-pause": isTimerRunning,
          })}
        />
      </button>
      {/* TODO: Implement stopping the current focus or break session. and disable the stop button when there is no active session */}
      {/* TODO: Disable the stop button when there is no active session */}
      <button
        type="button"
        className="btn btn-secondary"
        data-testid="stop"
        title="Stop the session"
        onClick={handleStopButton}
        disabled={!isSessionActive}
      >
        <span className="oi oi-media-stop" />
      </button>
    </div>
  );
}

TimeControl.propTypes = {
  playPause: PropTypes.func.isRequired,
  handleStopButton: PropTypes.func.isRequired,
  isSessionActive: PropTypes.bool.isRequired,
  isTimerRunning: PropTypes.bool.isRequired,
};

export default TimeControl;
