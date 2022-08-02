import React from "react";
import css from "./Graph.module.css";
import { intensity, colorPalette } from "../../functions/rpeStrings";

function SvgText(props) {
  const { mass, reps, sets, rpe, date } = props.showValue;

  return (
    <>
      <svg height="50" width="30">
        <circle
          id="3"
          cx="50%"
          cy="50%"
          r="8"
          stroke="rgb(0, 0, 0, 20%)"
          strokeWidth="2"
          fill={colorPalette[rpe]}
        ></circle>
      </svg>
      <div>
        <p className={css.graphText}>
          {date.day}.{date.month}.{date.year}
        </p>
        <p className={css.graphText}>
          {mass}kg, {reps} reps for {sets} sets
        </p>
        <p className={css.graphText}>{intensity[rpe]} intensity</p>
      </div>
    </>
  );
}

export default SvgText;
