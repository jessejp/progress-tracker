import css from "./AddEntryForm.module.css";
import { useDispatch } from "react-redux";
import { entryActions } from "../../store/entries-slice";
import { useState } from "react";

const defaultFormState = {
  name: "",
  mass: "",
  reps: "",
  sets: "",
};

const AddEntryForm = () => {
  const [userInput, setUserInput] = useState(defaultFormState);

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
      default:
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

    setUserInput(defaultFormState);
  };

  return (
    <form className={css.formContainer}>
      <p>Set initial values</p>
      <label htmlFor="name">Move Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={userInput.name}
        onChange={updateInputStates}
      />

      <label htmlFor="mass">Mass</label>
      <input
        type="number"
        name="mass"
        id="mass"
        value={userInput.mass}
        onChange={updateInputStates}
      />

      <label htmlFor="reps">Reps</label>
      <input
        type="number"
        name="reps"
        id="reps"
        value={userInput.reps}
        onChange={updateInputStates}
      />

      <label htmlFor="sets">Sets</label>
      <input
        type="number"
        name="sets"
        id="sets"
        value={userInput.sets}
        onChange={updateInputStates}
      />
      <div>
        <button onClick={addNewEntry}>Submit</button>
      </div>
    </form>
  );
};

export default AddEntryForm;
