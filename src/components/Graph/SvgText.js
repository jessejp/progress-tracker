import React from "react";
import css from "./Graph.module.css";
import { intensity, colorPalette } from "../../store/rpeStrings";

function SvgText(props) {
  const { mass, reps, sets, rpe, date } = props.showValue;
  
  return (
    <>
      <circle
        id="3"
        cx="12"
        cy="50%"
        r="8"
        stroke="rgb(0, 0, 0, 20%)"
        strokeWidth="2"
        fill={colorPalette[rpe]}
      ></circle>
      <text className={css.graphText} x={25} y="30%">
        {date.day}.{date.month}.{date.year}
      </text>
      <text className={css.graphText} x={25} y="60%">
        {mass}kg, {reps} reps for {sets} sets
      </text>
      <text className={css.graphText} x={25} y="90%">
        {intensity[rpe]}
      </text>
    </>
  );
}

export default SvgText;
