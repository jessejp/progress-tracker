import { useSelector } from "react-redux";
import css from "./Entries.module.css";
import EntriesRowItem from "./EntriesRowItem";
import { Routes, Route, Link, useParams } from "react-router-dom";
import AddEntryForm from "../AddNewEntry/AddEntryForm";

const Entries = () => {
  const entries = useSelector((state) => state.entries);
  const params = useParams();
  const formOpen = Object.values(params)[0];

  // map table rows
  const entryRows = entries.map((e, index) => {
    return (
      <EntriesRowItem
        id={`${e.category}_${e.name}`}
        key={`${e.category}_${e.name}`}
        index={index}
        name={e.name}
        mass={e.mass}
        reps={e.reps}
        sets={e.sets}
      />
    );
  });

  return (
    <>
      <Routes>
        <Route path="addnew" element={<AddEntryForm />} />
      </Routes>
      <div className={css.entriesContainer}>
        <div className={css.entriesTable}>
          <div className={css.templateHeading}>
            <div>Weight Lifting</div>
            <div>
              {!formOpen && <Link to="addnew">Add New</Link>}
              {formOpen && <a>close</a>}
            </div>
          </div>

          <div className={css.row}>
            <div className={css.col}>Name</div>
            <div className={css.col}>Mass</div>
            <div className={css.col}>Reps</div>
            <div className={css.col}>Sets</div>
            <div className={css.col}></div>
          </div>
          {entryRows}
        </div>
      </div>
    </>
  );
};

export default Entries;