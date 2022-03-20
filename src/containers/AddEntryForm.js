import css from "./AddEntryForm.module.css";
import { useDispatch } from "react-redux";
import { entryActions } from "../store/entries-slice";
import { useState } from "react";

const AddEntryForm = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    mass: "",
    reps: "",
    sets: "",
  });

  const dispatch = useDispatch();

  const updateInputStates = (event) => {
    switch (event.target.id) {
      case "name":
        setUserInput({
          ...userInput,
          name: event.target.value,
        });
        break;

      case "mass":
        setUserInput({
          ...userInput,
          mass: event.target.value,
        });
        break;

      case "reps":
        setUserInput({
          ...userInput,
          reps: event.target.value,
        });
        break;

      case "sets":
        setUserInput({
          ...userInput,
          sets: event.target.value,
        });
        break;
    }
  };

  const addNewEntry = (event) => {
    event.preventDefault();
    dispatch(
      entryActions.addEntry({
        name: userInput.name,
        mass: +userInput.mass,
        reps: +userInput.reps,
        sets: +userInput.sets,
      })
    );
  };

  return (
    <form className={css.formContainer}>
      <p>Set initial values</p>
      <label htmlFor="name">Move Name</label>
      <input type="text" name="name" id="name" onChange={updateInputStates} />

      <label htmlFor="mass">Mass</label>
      <input type="number" name="mass" id="mass" onChange={updateInputStates} />

      <label htmlFor="reps">Reps</label>
      <input type="number" name="reps" id="reps" onChange={updateInputStates} />

      <label htmlFor="sets">Sets</label>
      <input type="number" name="sets" id="sets" onChange={updateInputStates} />

      <button onClick={addNewEntry}>Submit</button>
    </form>
  );
};

export default AddEntryForm;
