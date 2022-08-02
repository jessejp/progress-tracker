import css from "./Entries.module.css";
import React, { useState, useEffect } from "react";
import { uiActions } from "../../store/ui-slice";
import { useDispatch } from "react-redux";

const EntriesDataInput = (props) => {
  const dispatch = useDispatch();
  const [enableEditing, setEnableEditing] = useState(false);

  // State for saving the data edit menu when blur event is activated for another input.
  const [keepEditing, setKeepEditing] = useState(false);

  useEffect(() => {
    let timerBlur = setTimeout(() => {
      if (!keepEditing) {
        setEnableEditing(false);
        dispatch(uiActions.disableEditingEntry());
      }
    }, 100);

    return () => {
      clearTimeout(timerBlur);
    };
  }, [keepEditing, dispatch]);

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
      dispatch(uiActions.enableEditingEntry());
    }

    if (event.type === "blur" || event.code === "Enter") {
      setKeepEditing(false);
    }
  };

  const dataEditSimpleForm = (
    <div className={css.numPadContainer}>
      <button
        name={props.type}
        className={css.numBuff}
        id="BUFF"
        onClick={props.onUpdateBufferButton}
      >
        +{props.bufferValue}
      </button>
      <input
        name={props.type}
        autoFocus
        className={css.numPad}
        id="NUMBER"
        type="number"
        value={props.dataValue}
        onChange={props.onUpdateInputField}
        onKeyDown={enableEditingHandler}
        min=""
      />
      <button
        name={props.type}
        className={css.numDebuff}
        id="DEBUFF"
        onClick={props.onUpdateBufferButton}
      >
        -{props.bufferValue}
      </button>
    </div>
  );

  if (props.type !== "RPE") {
    return (
      <div
        className={css.flexItem}
        name={props.type}
        onClick={enableEditingHandler}
        onBlur={enableEditingHandler}
        onFocus={enableEditingHandler}
      >
        <label htmlFor={props.type}>{props.type}</label>
        {!enableEditing && (
          <div
            className={css.valueField}
            onKeyDown={enableEditingHandler}
            tabIndex={0}
          >
            {props.dataValue}
            {props.unit}
          </div>
        )}
        {enableEditing && dataEditSimpleForm}
      </div>
    );
  }
  if (props.type === "RPE") {
    return (
      <div
        className={css.flexItem}
        name={props.type}
        onClick={enableEditingHandler}
        onBlur={enableEditingHandler}
        onFocus={enableEditingHandler}
      >
        <label htmlFor={props.type}>{props.type}</label>
        {!enableEditing && (
          <div
            className={css.valueField}
            onKeyDown={enableEditingHandler}
            tabIndex={0}
          >
            <span>{props.dataValue + 1}</span>
            <span>: {props.rpeText[props.dataValue]}</span>
          </div>
        )}
        {enableEditing && (
          <input
            name={props.type}
            autoFocus
            id="NUMBER"
            onChange={props.onUpdateInputField}
            onKeyDown={enableEditingHandler}
            defaultValue={props.dataValue}
            type="range"
            step="1"
            min="0"
            max="4"
          />
        )}
      </div>
    );
  }
};

export default EntriesDataInput;
