import { useSelector, useDispatch } from "react-redux";
import css from "../components/Entries/Entries.module.css";
import EntriesRowItem from "../components/Entries/EntriesRowItem";
import { Routes, Route, Link, useParams } from "react-router-dom";
import AddEntryForm from "../components/AddNewEntry/AddEntryForm";
import { useEffect } from "react";
import { sendEntryData, getEntryData } from "../store/data-actions";

const Entries = () => {
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.entries);
  const params = useParams();
  const formOpen = Object.values(params)[0];
  const categoryIndex = 0;

  useEffect(() => {
    dispatch(getEntryData());
  }, [dispatch]);

  useEffect(() => {
    console.log("entries: effect");
    //dispatch(sendEntryData(entries));
  }, [entries, dispatch]);
  console.log(entries);

  const sendReqTest = () => {
    dispatch(sendEntryData(entries));
  };

  // map table rows
  const entryRows =
    entries.entries.length > 0
      ? entries.entries[categoryIndex].entryData.map((e, index) => {
          return (
            <EntriesRowItem
              id={`${entries.entries[categoryIndex].category}_${e.name}`}
              key={`${entries.entries[categoryIndex].category}_${e.name}`}
              index={index}
              category={entries.entries[categoryIndex].category}
              name={e.name}
              mass={e.mass}
              reps={e.reps}
              sets={e.sets}
            />
          );
        })
      : [];

  return (
    <>
      <Routes>
        <Route path="addnew" element={<AddEntryForm />} />
      </Routes>
      <div className={css.entriesContainer}>
        <div className={css.entriesTable}>
          <div className={css.templateHeading}>
            <h3>Weight Lifting</h3>
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
        {!formOpen && (
          <Link to="addnew">
            <div className={`${css.addItem} iconTextLink`}>
              <span className="material-icons-outlined">add</span>{" "}
              <span>Add New</span>
            </div>
          </Link>
        )}
        <button onClick={sendReqTest}>casual send request button</button>
      </div>
    </>
  );
};

export default Entries;
