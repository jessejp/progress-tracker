import { useEffect, useReducer, useState } from "react";
import css from "./Entries.module.css";

const dataValuesReducer = (state, action) => {
  if (action.evHandler === "CHANGE") {
    return {
      name: action.name,
      mass: action.value,
      reps: state.reps,
      sets: state.sets,
      rpe: state.rpe,
    };
  }
  if (action.evHandler === "BUFF") {
    return {
      name: action.name,
      mass: state.mass + action.value,
      reps: state.reps,
      sets: state.sets,
      rpe: state.rpe,
    };
  }
  if (action.evHandler === "DEBUFF") {
    return {
      name: action.name,
      mass: state.mass - action.value,
      reps: state.reps,
      sets: state.sets,
      rpe: state.rpe,
    };
  }
  return {
    name: state.name,
    mass: state.mass,
    reps: state.reps,
    sets: state.sets,
    rpe: state.rpe,
  };
};

const EntriesRowItem = (props) => {
  const initDataValues = {
    name: props.name,
    mass: +props.mass,
    reps: +props.reps,
    sets: +props.sets,
    rpe: 5,
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
    //props.onDataSubmit(props.name, props.mass, props.reps, props.sets);
    //dataCtx.addEntry(dataValues);
  };

  /* As the form to edit data pops up after interacting with the data key, 
  here I declare the rules for if the form should be hidden after blurring from the inputs or to stay open */
  const enableEditing = (event) => {
    if (
      event.type === "click" ||
      event.code === "Enter" ||
      (event.type === "focus" &&
        ["BUFF", "DEBUFF", "NUMBER"].includes(event.target.id))
    ) {
      setOpenDataEdit(true);
      setKeepEditing(true);
    }

    if (event.type === "blur") setKeepEditing(false);
  };

  const updateSingleValueHandler = (event) => {
    dispatchUpdate({
      type: "MASS",
      name: event.target.name,
      evHandler: "CHANGE",
      value: +event.target.value,
    });
  };

  const updateValueMinBtnHandler = (event) => {
    const minVal = 2.5;

    dispatchUpdate({
      type: "MASS",
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
      <input
        autoFocus
        className={css.numPad}
        id="NUMBER"
        type="text"
        value={dataValues.mass}
        onChange={updateSingleValueHandler}
        name={props.name}
      />
      <button
        className={css.numDebuff}
        id="DEBUFF"
        onClick={updateValueMinBtnHandler}
        name={props.name}
      >
        -2.5
      </button>
    </div>
  );

  return (
    <div className={css.row} key={props.id}>
      <div className={css.col}>
        <span className={css.tableData}>{props.name}</span>
      </div>
      <div
        className={css.col}
        id="mass"
        onClick={enableEditing}
        onBlur={enableEditing}
        onFocus={enableEditing}
      >
        {!openDataEdit && (
          <span
            className={css.tableData}
            onKeyDown={enableEditing}
            tabIndex={0}
          >
            {dataValues.mass}kg
          </span>
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
