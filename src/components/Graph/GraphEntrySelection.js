import { useSelector } from "react-redux";
import css from "./Graph.module.css";

const GraphEntrySelection = (props) => {
  const dataState = useSelector((state) => state.graph.data);

  return (
    <form className={css.entryForm} onChange={props.onSelectedEntry}>
      <label htmlFor="entrySelection">Choose an exercise: </label>
      <select name="entrySelection">
        {dataState.length > 0 &&
          dataState[0].graphData.map((entry) => {
            return (
              <option key={entry.name} value={entry.name}>
                {entry.name}
              </option>
            );
          })}
        {dataState.length === 0 && <option>No Data Available</option>}
      </select>
    </form>
  );
};

export default GraphEntrySelection;
