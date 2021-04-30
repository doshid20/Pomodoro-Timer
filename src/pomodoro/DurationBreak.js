import React from "react";
import PropTypes from "prop-types";
import { minutesToDuration } from "../utils/duration";

function DurationBreak(props) {
  const {
    breakDuration,
    handleBreakDecrement,
    handleBreakIncrement,
    isSessionActive,
  } = props;

  return (
    <div className="input-group input-group-lg mb-2">
      <span className="input-group-text" data-testid="duration-break">
        {/* TODO: Update this text to display the current break session duration */}
        Break Duration: {minutesToDuration(breakDuration)}
      </span>
      <div className="input-group-append">
        {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="decrease-break"
          onClick={!isSessionActive ? handleBreakDecrement : undefined}
          disabled={isSessionActive}
        >
          <span className="oi oi-minus" />
        </button>
        {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="increase-break"
          onClick={!isSessionActive ? handleBreakIncrement : undefined}
          disabled={isSessionActive}
        >
          <span className="oi oi-plus" />
        </button>
      </div>
    </div>
  );
}

DurationBreak.propTypes = {
  breakDuration: PropTypes.number.isRequired,
  handleBreakDecrement: PropTypes.func.isRequired,
  handleBreakIncrement: PropTypes.func.isRequired,
  isSessionActive: PropTypes.bool.isRequired,
};

export default DurationBreak;
