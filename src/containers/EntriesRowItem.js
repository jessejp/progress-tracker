import { useContext, useEffect, useReducer, useState } from "react";
import DataContext from "../store/data-context";
import css from "./Entries.module.css";

const dataValuesReducer = (state, action) => {
  if (action.evHandler === "CHANGE") {
    return {
      name: action.name,
      vol: action.value,
      reps: state.reps,
      sets: state.sets,
    };
  }
  if (action.evHandler === "BUFF") {
    return {
      name: action.name,
      vol: state.vol + action.value,
      reps: state.reps,
      sets: state.sets,
    };
  }
  if (action.evHandler === "DEBUFF") {
    return {
      name: action.name,
      vol: state.vol - action.value,
      reps: state.reps,
      sets: state.sets,
    };
  }
  return {
    name: state.name,
    vol: state.vol,
    reps: state.reps,
    sets: state.sets,
  };
};

const EntriesRowItem = (props) => {
  const initDataValues = {
    name: props.name,
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

  const dataCtx = useContext(DataContext);

  useEffect(() => {
    let timerBlur = setTimeout(() => {
      if (!keepEditing) setOpenDataEdit(false);
    }, 250);
    /* let timerInactivity = setTimeout(() => {
      setOpenDataEdit(false);
    }, 2000); */
    return () => {
      clearTimeout(timerBlur);
      /* clearTimeout(timerInactivity); */
    };
  }, [keepEditing]);

  const submitDataHandler = (event) => {
    console.log(dataValues);
    //props.onDataSubmit(props.name, props.vol, props.reps, props.sets);
    dataCtx.addEntry(dataValues);
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
      name: event.target.name,
      evHandler: "CHANGE",
      value: +event.target.value,
    });
  };

  const updateValueMinBtnHandler = (event) => {
    const minVal = 2.5;

    dispatchUpdate({
      type: "VOL",
      name: event.target.name,
      evHandler: event.target.id,
      value: minVal,
    });
  };

  const dataEditSimpleForm = (
    <div className={css.numPadContainer}>
      <button
        className={css.numBuff}
        id="BUFF"
        onClick={updateValueMinBtnHandler}
        name={props.name}
      >
        2.5
      </button>
      <button
        className={css.numDebuff}
        id="DEBUFF"
        onClick={updateValueMinBtnHandler}
        name={props.name}
      >
        -2.5
      </button>
      <input
        autoFocus
        className={css.numPad}
        type="text"
        value={dataValues.vol}
        onChange={updateSingleValueHandler}
        name={props.name}
      />
    </div>
  );

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
          <span className={css.tableData}>{dataValues.vol}kg</span>
        )}
        {openDataEdit && dataEditSimpleForm}
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
            name={props.name}
          ></button>
          {props.enableRPE && (
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
