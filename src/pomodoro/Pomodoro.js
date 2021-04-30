import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import DurationFocus from "./DurationFocus";
import DurationBreak from "./DurationBreak";
import TimeControl from "./TimeControl";
import Progress from "./Progress";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [focusDuration, setFocusDuration] = useState(25); // in minute
  const [breakDuration, setBreakDuration] = useState(5); //in minute

  // adjust session active default to inactive
  const [isSessionActive, setIsSessionActive] = useState(false);

  //adjust pause default to pause
  const [isSessionPause, setIsSessionPause] = useState(true);

  //set up timer remaining
  const [timer, setTimer] = useState(1500); //in second

  // current session default to "Focus"
  const [currentState, setCurrentState] = useState("focus");

  // handle increment on focus
  const handleFocusIncrement = () => {
    setFocusDuration((currentValue) => {
      return Math.min(60, currentValue + 5);
    });
  };

  //handle decrement on focus
  const handleFocusDecrement = () => {
    setFocusDuration((currentValue) => {
      return Math.max(5, currentValue - 5);
    });
  };

  //handle inrement on break
  const handleBreakIncrement = () => {
    setBreakDuration((currentValue) => {
      return Math.min(15, currentValue + 1);
    });
  };

  //handle decrement on break
  const handleBreakDecrement = () => {
    setBreakDuration((currentValue) => {
      return Math.max(1, currentValue - 1);
    });
  };

  //handle stop button
  const handleStopButton = () => {
    setIsSessionActive(false);
    setIsTimerRunning(false);
    setIsSessionPause(true);
    setCurrentState("focus");
  };

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(
    () => {
      if (timer === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();

        const newTime =
          currentState === "focus" ? breakDuration : focusDuration;

        // set up breakDuration / focusDuration in second
        setTimer(newTime * 60);

        // switching session focus /  Break
        setCurrentState((prevState) =>
          prevState === "focus" ? "break" : "focus"
        );
        return;
      }
      setTimer((currentTime) => currentTime - 1);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Switch play and pause when session is active
   * toggle states
   */
  function playPause() {
    if (!isSessionActive) {
      setIsSessionActive(true);
      setTimer(focusDuration * 60);
    }
    setIsSessionPause((prevState) => !prevState);

    setIsTimerRunning((prevState) => !prevState);
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <DurationFocus
            focusDuration={focusDuration}
            handleFocusDecrement={handleFocusDecrement}
            handleFocusIncrement={handleFocusIncrement}
            isSessionActive={isSessionActive}
          />
        </div>
        <div className="col">
          <div className="float-right">
            <DurationBreak
              breakDuration={breakDuration}
              handleBreakDecrement={handleBreakDecrement}
              handleBreakIncrement={handleBreakIncrement}
              isSessionActive={isSessionActive}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TimeControl
            playPause={playPause}
            isTimerRunning={isTimerRunning}
            handleStopButton={handleStopButton}
            isSessionActive={isSessionActive}
          />
        </div>
      </div>
      <Progress
        currentState={currentState}
        timer={timer}
        isSessionActive={isSessionActive}
        focusDuration={focusDuration}
        breakDuration={breakDuration}
        isSessionPause={isSessionPause}
      />
    </div>
  );
}

export default Pomodoro;
