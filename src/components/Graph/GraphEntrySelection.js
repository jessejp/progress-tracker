import { useSelector } from "react-redux";
import css from "./Graph.module.css";

const GraphEntrySelection = (props) => {
  const dataState = useSelector((state) => state.graph.data);

  return (
    <form className={css.entryForm} onChange={props.onSelectedEntry}>
      <label htmlFor="entrySelection">Choose an exercise:</label>
      <select name="entrySelection">
        {dataState.map((entry) => {
          return (
            <option key={entry.name} value={entry.name}>
              {entry.name}
            </option>
          );
        })}
      </select>
    </form>
  );
};

export default GraphEntrySelection;
