import { useEffect, useReducer, useState } from "react";
import css from "./Entries.module.css";

const dataValuesReducer = (state, action) => {
  console.log(action.type, action.evHandler, action.value);
  if (action.evHandler === "CHANGE") {
    return {
      vol: action.value,
      reps: state.reps,
      sets: state.sets,
    };
  }
  if (action.evHandler === "BUFF") {
    return {
      vol: state.vol + action.value,
      reps: state.reps,
      sets: state.sets,
    };
  }
  if (action.evHandler === "DEBUFF") {
    return {
      vol: state.vol - action.value,
      reps: state.reps,
      sets: state.sets,
    };
  }
  return {
    vol: state.vol,
    reps: state.reps,
    sets: state.sets,
  };
};

const EntriesRowItem = (props) => {
  const initDataValues = {
    vol: +props.vol,
    reps: +props.reps,
    sets: +props.sets,
  };

  const [openDataEdit, setOpenDataEdit] = useState(false);

  // State for saving the data edit menu when blur event is activated for another input.
  const [keepEditing, setKeepEditing] = useState(false);

  // Reducer for editing any value of entry
  const [dataValues, dispatchUpdate] = useReducer(
    dataValuesReducer,
    initDataValues
  );

  useEffect(() => {
    let timerBlur = setTimeout(() => {
      if (!keepEditing) setOpenDataEdit(false);
    }, 250);
    let timerInactivity = setTimeout(() => {
      setOpenDataEdit(false);
    }, 2000);
    return () => {
      clearTimeout(timerBlur);
      clearTimeout(timerInactivity);
    };
  }, [keepEditing]);

  const submitDataHandler = () => {
    console.log("button pressed");
    //props.onDataSubmit(props.name, props.vol, props.reps, props.sets);
  };

  const enableEditing = (event) => {
    if (event.type === "click") {
      setOpenDataEdit(true);
      setKeepEditing(true);
    }

    if (event.type === "blur") setKeepEditing(false);
  };

  const updateSingleValueHandler = (event) => {
    dispatchUpdate({
      type: "VOL",
      evHandler: "CHANGE",
      value: +event.target.value,
    });
  };

  const updateValueMinBtnHandler = (event) => {
    const minVal = 2.5;

    dispatchUpdate({
      type: "VOL",
      evHandler: event.target.id,
      value: minVal,
    });
  };

  return (
    <div className={css.row} key={props.id}>
      <div className={css.col}>
        <span className={css.tableData}>{props.name}</span>
      </div>
      <div
        className={css.col}
        id="vol"
        onClick={enableEditing}
        onBlur={enableEditing}
      >
        {!openDataEdit && (
          <span className={css.tableData}>{dataValues.vol}</span>
        )}

        {openDataEdit && (
          <div className={css.numPadContainer}>
            <button
              className={css.numBuff}
              id="BUFF"
              onClick={updateValueMinBtnHandler}
            >
              2.5
            </button>
            <button
              className={css.numDebuff}
              id="DEBUFF"
              onClick={updateValueMinBtnHandler}
            >
              -2.5
            </button>
            <input
              autoFocus
              className={css.numPad}
              type="text"
              value={dataValues.vol}
              onChange={updateSingleValueHandler}
            />
          </div>
        )}
      </div>
      <div className={css.col} id="reps">
        <span className={css.tableData}>{props.reps}</span>
      </div>
      <div className={css.col} id="sets">
        <span className={css.tableData}>{props.sets}</span>
      </div>
      <div className={css.col}>
        <div className={css.buttonsContainer}>
          <button
            className={css.submitButton}
            onClick={submitDataHandler}
          ></button>
          {props.enableColorKeys && (
            <>
              <button className={css.submitButton}></button>
              <button className={css.submitButton}></button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntriesRowItem;
