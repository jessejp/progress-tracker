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

const suggestedExercises = [
  {
    name: "Bench Press",
    mass: "20",
    reps: "8",
    sets: "3",
  },
];

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

  const fillSuggestion = (event) => {
    console.log(
      event.target.value,
      suggestedExercises.find(
        (exercise) => exercise.name === event.target.value
      )
    );
    setUserInput(
      suggestedExercises.find(
        (exercise) => exercise.name === event.target.value
      )
    );
  };

  const addNewEntry = (event) => {
    event.preventDefault();

    if (userInput.name !== "") {
      dispatch(
        entryActions.addEntry({
          name: userInput.name,
          mass: +userInput.mass,
          reps: +userInput.reps,
          sets: +userInput.sets,
        })
      );
      setUserInput(defaultFormState);
    }
  };

  return (
    <form className={css.formContainer}>
      <h2>Set initial values</h2>
      {suggestedExercises.map((e, index) => {
        return (
          <button
            key={index}
            className={css.suggestionButton}
            type="button"
            value={e.name}
            onClick={fillSuggestion}
          >
            {e.name}
          </button>
        );
      })}
      <label htmlFor="name">Exercise Name</label>
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
