import { useEffect, useReducer, useState } from "react";
import css from "./Entries.module.css";
import EntriesDataInput from "./EntriesDataInput";
import { useDispatch } from "react-redux";
import { graphDataActions } from "../../store/graph-data-slice";

const defaultBufferValue = {
  mass: 2.5,
  reps: 1,
  sets: 1,
};

const dataValuesReducer = (state, action) => {
  const defaultState = {
    name: state.name,
    mass: state.mass,
    reps: state.reps,
    sets: state.sets,
  };

  if (action.evHandler === "CHANGE") {
    switch (action.type) {
      case "mass":
        return {
          ...state,
          mass: action.value,
        };
      case "reps":
        return {
          ...state,
          reps: action.value,
        };
      case "sets":
        return {
          ...state,
          sets: action.value,
        };
      default:
        return defaultState;
    }
  }
  if (action.evHandler === "BUFF") {
    switch (action.type) {
      case "mass":
        return {
          ...state,
          mass: state.mass + defaultBufferValue.mass,
        };
      case "reps":
        return {
          ...state,
          reps: state.reps + defaultBufferValue.reps,
        };
      case "sets":
        return {
          ...state,
          sets: state.sets + defaultBufferValue.reps,
        };
      default:
        return defaultState;
    }
  }
  if (action.evHandler === "DEBUFF") {
    switch (action.type) {
      case "mass":
        return {
          ...state,
          mass: state.mass - defaultBufferValue.mass,
        };
      case "reps":
        return {
          ...state,
          reps: state.reps - defaultBufferValue.reps,
        };
      case "sets":
        return {
          ...state,
          sets: state.sets - defaultBufferValue.reps,
        };
      default:
        return defaultState;
    }
  }
  return defaultState;
};

const EntriesRowItem = (props) => {
  const initDataValues = {
    name: props.name,
    mass: +props.mass,
    reps: +props.reps,
    sets: +props.sets,
  };

  const [enableEditing, setEnableEditing] = useState(false);
  // State for saving the data edit menu when blur event is activated for another input.
  const [keepEditing, setKeepEditing] = useState(false);

  // Reducer for editing any value of entry
  const [dataValues, dispatchUpdate] = useReducer(
    dataValuesReducer,
    initDataValues
  );

  const dispatch = useDispatch();

  useEffect(() => {
    let timerBlur = setTimeout(() => {
      if (!keepEditing) setEnableEditing(false);
    }, 250);
    /* let timerInactivity = setTimeout(() => {
      setEnableEditing(false);
    }, 2000); */
    return () => {
      clearTimeout(timerBlur);
      /* clearTimeout(timerInactivity); */
    };
  }, [keepEditing]);

  const submitDataHandler = (event) => {
    dispatch(graphDataActions.addData(dataValues));
    //props.onDataSubmit(dataValues.name, props.mass, props.reps, props.sets);
    //dataCtx.addEntry(dataValues);
  };

  /* As the form to edit data pops up after interacting with the data key, 
  here I declare the rules for if the form should be hidden after blurring from the inputs or to stay open */
  const enableEditingHandler = (event) => {
    if (
      event.type === "click" ||
      event.code === "Enter" ||
      (event.type === "focus" &&
        ["BUFF", "DEBUFF", "NUMBER"].includes(event.target.id))
    ) {
      setEnableEditing(true);
      setKeepEditing(true);
    }

    if (event.type === "blur" || event.code === "Enter") setKeepEditing(false);
  };

  const updateValueInputHandler = (event) => {
    dispatchUpdate({
      type: event.target.name,
      evHandler: "CHANGE",
      value: +event.target.value,
    });
  };

  const updateValueBtnHandler = (event) => {
    const minVal = 2.5;

    dispatchUpdate({
      type: event.target.name,
      evHandler: event.target.id,
      value: minVal,
    });
  };

  return (
    <div className={css.row} key={props.id}>
      <div className={css.col}>
        <span className={css.tableData}>{dataValues.name}</span>
      </div>
      <EntriesDataInput
        type="mass"
        onUpdateBufferButton={updateValueBtnHandler}
        onUpdateInputField={updateValueInputHandler}
        dataName={dataValues.name}
        dataValue={dataValues.mass}
        onEnableEditing={enableEditingHandler}
        enableEditingState={enableEditing}
        bufferValue={defaultBufferValue.mass}
        unit="kg"
      />
      <EntriesDataInput
        type="reps"
        onUpdateBufferButton={updateValueBtnHandler}
        onUpdateInputField={updateValueInputHandler}
        dataName={dataValues.name}
        dataValue={dataValues.reps}
        onEnableEditing={enableEditingHandler}
        enableEditingState={enableEditing}
        bufferValue={defaultBufferValue.reps}
      />
      <EntriesDataInput
        type="sets"
        onUpdateBufferButton={updateValueBtnHandler}
        onUpdateInputField={updateValueInputHandler}
        dataName={dataValues.name}
        dataValue={dataValues.sets}
        onEnableEditing={enableEditingHandler}
        enableEditingState={enableEditing}
        bufferValue={defaultBufferValue.sets}
      />
      <div className={css.col}>
        <div className={css.buttonsContainer}>
          <button
            className={css.submitButton}
            onClick={submitDataHandler}
            name={dataValues.name}
          >
            ✔
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntriesRowItem;
