import { useEffect, useReducer, useState } from "react";
import css from "./Entries.module.css";
import EntriesDataInput from "./EntriesDataInput";
import { useDispatch, useSelector } from "react-redux";
import { graphDataActions } from "../../store/graph-data-slice";
import { entryActions } from "../../store/entries-slice";
import { uiActions } from "../../store/ui-slice";
import { intensity } from "../../functions/rpeStrings";
import { getWeekNumber } from "../../functions/getWeekNumber";

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
  const editingEntry = useSelector((state) => state.ui.editingEntry);

  const [allowEntryDispatch, setAllowEntryDispatch] = useState(false);

  // Reducer for editing any value of entry
  const [dataValues, dispatchUpdate] = useReducer(
    dataValuesReducer,
    initDataValues
  );

  const dispatch = useDispatch();

  // editing window effect, we are done editing.
  useEffect(() => {
    let entryDispatchTimer = setTimeout(() => {
      if (allowEntryDispatch === true && !editingEntry) {
        console.log("entry redux updated.");
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

        console.log(
          "usaved Entry data uiAction dispatched in EntiesRowItem effect."
        );
        dispatch(uiActions.unsavedEntriesData());
        setAllowEntryDispatch(false);
      }
    }, 450);
    return () => {
      clearTimeout(entryDispatchTimer);
    };
  }, [dispatch, dataValues, allowEntryDispatch, editingEntry]);

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
    dispatch(uiActions.unsavedGraphData());
  };

  const updateRPEValueInputHandler = (event) => {
    setAllowEntryDispatch(true);
    dispatchUpdate({
      type: event.target.name,
      evHandler: "CHANGE",
      value: +event.target.valueAsNumber,
    });
  };

  const updateValueInputHandler = (event) => {
    setAllowEntryDispatch(true);
    dispatchUpdate({
      type: event.target.name,
      evHandler: "CHANGE",
      value: +event.target.value,
    });
  };

  const updateValueBtnHandler = (event) => {
    setAllowEntryDispatch(true);
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
          bufferValue={settings.stepIntervalMass}
          unit="kg"
        />
        <EntriesDataInput
          type="reps"
          onUpdateBufferButton={updateValueBtnHandler}
          onUpdateInputField={updateValueInputHandler}
          dataValue={dataValues.reps}
          bufferValue={settings.stepIntervalReps}
        />
        <EntriesDataInput
          type="sets"
          onUpdateBufferButton={updateValueBtnHandler}
          onUpdateInputField={updateValueInputHandler}
          dataValue={dataValues.sets}
          bufferValue={settings.stepIntervalSets}
        />
        {settings.enableRPE === true && (
          <EntriesDataInput
            type="RPE"
            onUpdateInputField={updateRPEValueInputHandler}
            dataValue={dataValues.rpe}
            rpeText={intensity}
          />
        )}
      </div>
      <div className={css.flexItem}>
        <button
          className={`${css.submitButton} generic`}
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
