import css from "./AddEntryForm.module.css";
import { useDispatch } from "react-redux";
import { entryActions } from "../../store/entries-slice";
import { uiActions } from "../../store/ui-slice";
import { useState } from "react";
import { Link } from "react-router-dom";

const defaultFormState = {
  category: "Weight Training",
  name: "",
  mass: "",
  reps: "",
  sets: "",
};

const suggestedExercises = [
  {
    category: "Weight Training",
    name: "Bench Press",
    mass: "20",
    reps: "8",
    sets: "3",
  },
  {
    category: "Weight Training",
    name: "Squat",
    mass: "40",
    reps: "6",
    sets: "3",
  },
  {
    category: "Weight Training",
    name: "Lat Pulldown",
    mass: "50",
    reps: "8",
    sets: "3",
  },
];

const AddEntryForm = () => {
  const [userInput, setUserInput] = useState(defaultFormState);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dispatch = useDispatch();

  const showSuggestionsHandler = () => {
    setShowSuggestions((state) => !state);
  };

  const updateInputStates = (event) => {
    switch (event.target.id) {
      case "add_entry_name":
        setUserInput({
          ...userInput,
          name: event.target.value,
        });
        break;

      case "add_entry_mass":
        setUserInput({
          ...userInput,
          mass: event.target.value,
        });
        break;

      case "add_entry_reps":
        setUserInput({
          ...userInput,
          reps: event.target.value,
        });
        break;

      case "add_entry_sets":
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
          category: userInput.category,
          name: userInput.name,
          mass: +userInput.mass,
          reps: +userInput.reps,
          sets: +userInput.sets,
        })
      );
      setUserInput(defaultFormState);

      dispatch(uiActions.unsavedEntriesData());
    }
  };

  return (
    <div className={css.addEntryFormContainer}>
      <div className={css.addEntryFormHeading}>
        <div className={css.closeFormContainer}>
          <Link to="/entries" className={`${css.closeForm}`}>
            <span className="add_entry_material-icons-outlined">close</span>
          </Link>
        </div>
        <div>
          <h2>Set initial values</h2>
          {!showSuggestions && (
            <button
              className={css.showSuggestionButtons}
              onClick={showSuggestionsHandler}
            >
              Show Exercise Suggestions
            </button>
          )}
          {showSuggestions &&
            suggestedExercises.map((e, index) => {
              return (
                <button
                  key={`${index}_suggestion`}
                  className={css.suggestionButton}
                  type="button"
                  value={e.name}
                  onClick={fillSuggestion}
                >
                  {e.name}
                </button>
              );
            })}
        </div>
      </div>

      <form className={css.formContainer} onSubmit={addNewEntry}>
        <div className={css.formInputsWrapper}>
          <div className={css.formInputContainer}>
            <label htmlFor="name">Exercise Name</label>
            <input
              type="text"
              name="add_entry_name"
              id="add_entry_name"
              value={userInput.name}
              onChange={updateInputStates}
            />
          </div>

          <div className={`${css.formInputContainer} ${css.massInputs}`}>
            <div>
              <label htmlFor="mass">Mass</label>
              <input
                type="number"
                name="add_entry_mass"
                id="add_entry_mass"
                value={userInput.mass}
                onChange={updateInputStates}
              />
            </div>
            {/* <div className={css.unitsContainer}>
              <label htmlFor="kg">kg</label>
              <input
                type="radio"
                name="add_entry_unit"
                id="add_entry_kg"
                value="kg"
                checked={true}
                onChange={updateInputStates}
              />
            </div>
            <div className={css.unitsContainer}>
              <label htmlFor="lbs">lbs.</label>
              <input
                type="radio"
                name="add_entry_unit"
                id="add_entry_lbs"
                value="lbs"
                onChange={updateInputStates}
              />
            </div> */}
          </div>

          <div className={css.formInputContainer}>
            <label htmlFor="reps">Reps</label>
            <input
              type="number"
              name="add_entry_reps"
              id="add_entry_reps"
              value={userInput.reps}
              onChange={updateInputStates}
            />
          </div>

          <div className={css.formInputContainer}>
            <label htmlFor="sets">Sets</label>
            <input
              type="number"
              name="add_entry_sets"
              id="add_entry_sets"
              value={userInput.sets}
              onChange={updateInputStates}
            />
          </div>
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddEntryForm;
