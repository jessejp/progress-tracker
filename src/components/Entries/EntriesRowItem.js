import { useCallback, useEffect, useReducer, useState } from "react";
import css from "./Entries.module.css";
import EntriesDataInput from "./EntriesDataInput";
import { useDispatch, useSelector } from "react-redux";
import { graphDataActions } from "../../store/graph-data-slice";
import { entryActions } from "../../store/entries-slice";
import { intensity } from "../../store/rpeStrings";

const EntriesRowItem = (props) => {
  const initDataValues = {
    category: props.category,
    name: props.name,
    mass: +props.mass,
    reps: +props.reps,
    sets: +props.sets,
    rpe: +props.rpe,
  };

  const settings = useSelector((state) => state.entries.entries[0].settings);

  const [enableEditing, setEnableEditing] = useState(false);
  // State for saving the data edit menu when blur event is activated for another input.
  const [keepEditing, setKeepEditing] = useState(false);

  // Reducer for editing any value of entry
  const [dataValues, dispatchUpdate] = useReducer(
    dataValuesReducer,
    initDataValues
  );

  const dispatch = useDispatch();

  // editing window effect
  useEffect(() => {
    let timerBlur = setTimeout(() => {
      if (!keepEditing) setEnableEditing(false);
    }, 250);
    return () => {
      clearTimeout(timerBlur);
    };
  }, [keepEditing]);

  //update reducer
  useEffect(() => {
    let timerRedux = setTimeout(() => {
      dispatch(
        entryActions.addEntry({
          category: dataValues.category,
          name: dataValues.name,
          mass: +dataValues.mass,
          reps: +dataValues.reps,
          sets: +dataValues.sets,
          rpe: +dataValues.rpe,
        })
      );
    }, 800);
    return () => {
      clearTimeout(timerRedux);
    };
  }, [dispatch, dataValues]);

  const submitDataHandler = (event) => {
    const submitDate = new Date();
    dispatch(
      graphDataActions.addData({
        ...dataValues,
        date: submitDate.toISOString(),
        week: getWeekNumber(submitDate),
        weekday: submitDate.getDay(),
      })
    );
  };

  const getWeekNumber = (d) => {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
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

  const updateRPEValueInputHandler = (event) => {
    console.log(event);
    dispatchUpdate({
      type: event.target.name,
      evHandler: "CHANGE",
      value: +event.target.valueAsNumber,
    });
  };

  const updateValueInputHandler = (event) => {
    dispatchUpdate({
      type: event.target.name,
      evHandler: "CHANGE",
      value: +event.target.value,
    });
  };

  const updateValueBtnHandler = (event) => {
    let stepVal = 0;

    switch (event.target.name) {
      case "mass":
        stepVal = settings.stepIntervalMass;
        break;
      case "reps":
        stepVal = settings.stepIntervalReps;
        break;
      case "sets":
        stepVal = settings.stepIntervalSets;
        break;
      default:
        break;
    }
    console.log(stepVal);
    dispatchUpdate({
      type: event.target.name,
      evHandler: event.target.id,
      step: +stepVal,
    });
  };

  return (
    <div className={css.flexWrapper} key={props.id}>
      <div className={`${css.flexItem} ${css.entryName}`}>
        {dataValues.name}
      </div>
      <div className={css.flexContainer}>
        <EntriesDataInput
          type="mass"
          onUpdateBufferButton={updateValueBtnHandler}
          onUpdateInputField={updateValueInputHandler}
          dataValue={dataValues.mass}
          onEnableEditing={enableEditingHandler}
          enableEditingState={enableEditing}
          bufferValue={settings.stepIntervalMass}
          unit="kg"
        />
        <EntriesDataInput
          type="reps"
          onUpdateBufferButton={updateValueBtnHandler}
          onUpdateInputField={updateValueInputHandler}
          dataValue={dataValues.reps}
          onEnableEditing={enableEditingHandler}
          enableEditingState={enableEditing}
          bufferValue={settings.stepIntervalReps}
        />
        <EntriesDataInput
          type="sets"
          onUpdateBufferButton={updateValueBtnHandler}
          onUpdateInputField={updateValueInputHandler}
          dataValue={dataValues.sets}
          onEnableEditing={enableEditingHandler}
          enableEditingState={enableEditing}
          bufferValue={settings.stepIntervalSets}
        />
        {settings.enableRPE === true && (
          <EntriesDataInput
            type="RPE"
            onUpdateInputField={updateRPEValueInputHandler}
            dataValue={dataValues.rpe}
            rpeText={intensity}
            onEnableEditing={enableEditingHandler}
            enableEditingState={enableEditing}
          />
        )}
      </div>
      <div className={css.flexItem}>
        <button
          className={css.submitButton}
          onClick={submitDataHandler}
          name={dataValues.name}
        >
          ✔
        </button>
      </div>
    </div>
  );
};

const dataValuesReducer = (state, action) => {
  const defaultState = {
    category: state.category,
    name: state.name,
    mass: state.mass,
    reps: state.reps,
    sets: state.sets,
    rpe: state.rpe,
  };
  console.log(action);

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
      case "RPE":
        return {
          ...state,
          rpe: action.value,
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
          mass: state.mass + action.step,
        };
      case "reps":
        return {
          ...state,
          reps: state.reps + action.step,
        };
      case "sets":
        return {
          ...state,
          sets: state.sets + action.step,
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
          mass: state.mass - action.step,
        };
      case "reps":
        return {
          ...state,
          reps: state.reps - action.step,
        };
      case "sets":
        return {
          ...state,
          sets: state.sets - action.step,
        };
      default:
        return defaultState;
    }
  }
  return defaultState;
};

export default EntriesRowItem;
