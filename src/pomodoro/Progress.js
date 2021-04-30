import React from "react";
import { minutesToDuration, secondsToDuration } from "../utils/duration";

function Progress(props) {
  const {
    currentState,
    timer,
    isSessionActive,
    focusDuration,
    breakDuration,
    isSessionPause,
  } = props;

  let progressBarWidth;
  // current time for given sesssion (focus/break)
  let currentTime = currentState === "focus" ? focusDuration : breakDuration;
  //change currenttiem to second
  currentTime = currentTime * 60;

  const timeElapse = currentTime - timer;

  if (timer === 0) {
    progressBarWidth = 100;
  } else {
    progressBarWidth = (100 / currentTime) * timeElapse;
  }

  if (isSessionActive) {
    return (
      <div style={{ display: isSessionActive ? "block" : "none" }}>
        {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
            <h2 data-testid="session-title">
              {currentState === "focus" ? "Focusing " : "On Break "}
              for{" "}
              {currentState === "focus"
                ? minutesToDuration(focusDuration)
                : minutesToDuration(breakDuration)}{" "}
              minutes
            </h2>
            {/* TODO: Update message below correctly format the time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {secondsToDuration(timer)} remaining
            </p>
            <h4>{isSessionPause === true ? "PAUSED" : " "}</h4>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={progressBarWidth} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${progressBarWidth}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Progress;
