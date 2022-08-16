import React from "react";
import css from "./Graph.module.css";
import { intensity, colorPalette } from "../../functions/rpeStrings";
import { useDispatch } from "react-redux";
import { graphDataActions } from "../../store/graph-data-slice";
import { uiActions } from "../../store/ui-slice";
import { useState } from "react";
import { useEffect } from "react";

function SvgText(props) {
  const dispatch = useDispatch();
  const [deleteCheck, setDeleteCheck] = useState(false);
  const { mass, reps, sets, rpe, date, index } = props.showValue;

  useEffect(() => {
    setDeleteCheck(false);
  }, [index]);

  const deleteHandler = () => {
    dispatch(
      graphDataActions.deleteData({
        name: props.name,
        category: "Weight Training",
        deletionType: "point",
        index: index,
      })
    );
    dispatch(uiActions.unsavedGraphData());

    props.showValueReset();
  };

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
      <div className={css.deleteButton}>
        {!deleteCheck && (
          <button
            className="generic"
            onClick={() => {
              setDeleteCheck(true);
            }}
          >
            Delete
          </button>
        )}
        {deleteCheck && (
          <>
            <div><p className="delete">Are you sure?</p></div>
            <button className="generic delete" onClick={deleteHandler}>
              Yes. Delete.
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default SvgText;
