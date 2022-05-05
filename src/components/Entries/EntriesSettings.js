import React, { useEffect, useState } from "react";
import css from "../AddNewEntry/AddEntryForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { entryActions } from "../../store/entries-slice";

const EntriesSettings = (props) => {
  const entries = useSelector((state) => state.entries);
  const [settings, setSettings] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applyChangesHandler = (event) => {
    event.preventDefault();
    dispatch(
      entryActions.updateSettings({
        category: "Weight Lifting",
        settings: settings,
      })
    );
    navigate("/entries", { replace: false });
  };

  useEffect(() => {
    console.log("set settings effect");
    if (entries.entries.length) {
      setSettings(entries.entries[0].settings);
    }
  }, [entries.entries]);

  const stepsIntervalMassHandler = (event) => {
    setSettings((prevState) => {
      return { ...prevState, stepIntervalMass: event.target.value };
    });
  };

  const stepsIntervalRepsHandler = (event) => {
    setSettings((prevState) => {
      return { ...prevState, stepIntervalReps: event.target.value };
    });
  };

  const stepsIntervalSetsHandler = (event) => {
    setSettings((prevState) => {
      return { ...prevState, stepIntervalSets: event.target.value };
    });
  };

  const enableRPEHandler = (event) => {
    setSettings((prevState) => {
      return { ...prevState, enableRPE: !prevState.enableRPE };
    });
  };

  return (
    <div className={css.addEntryFormContainer}>
      {settings !== null && (
        <form className={css.formContainer} onSubmit={applyChangesHandler}>
          <div className={css.formInputsWrapper}>
            <div className={css.formInputContainer}>
              <label>Steps Interval for mass</label>
              <input
                type="number"
                onChange={stepsIntervalMassHandler}
                value={settings.stepIntervalMass}
              />
            </div>
            <div className={css.formInputContainer}>
              <label>Steps Interval for reps</label>
              <input
                type="number"
                onChange={stepsIntervalRepsHandler}
                value={settings.stepIntervalReps}
              />
            </div>
            <div className={css.formInputContainer}>
              <label>Steps Interval for sets</label>
              <input
                type="number"
                onChange={stepsIntervalSetsHandler}
                value={settings.stepIntervalSets}
              />
            </div>
            <div className={css.formInputContainer}>
              <label>Enable RPE</label>
              <input
                type="checkbox"
                onChange={enableRPEHandler}
                checked={settings.enableRPE}
              />
            </div>
          </div>
          <div>
            <button>Apply Changes</button>
          </div>
        </form>
      )}
      {settings === null && <p>No Settings Available</p>}
    </div>
  );
};

export default EntriesSettings;
