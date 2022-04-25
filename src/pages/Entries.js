import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import css from "../components/Entries/Entries.module.css";
import EntriesRowItem from "../components/Entries/EntriesRowItem";
import { Routes, Route, Link, useParams } from "react-router-dom";
import AddEntryForm from "../components/AddNewEntry/AddEntryForm";
import { sendEntryData, getEntryData } from "../store/data-actions";
import EntriesSettings from "../components/Entries/EntriesSettings";

let isInitial = true;

const Entries = () => {
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.entries);
  const params = useParams();
  const formOpen = Object.values(params)[0];
  const categoryIndex = 0;
  /* 
  useEffect(() => {
    dispatch(getEntryData());
  }, [dispatch]);

  useEffect(() => {
    let entryTimer = setTimeout(() => {
      if (!isInitial) {
        console.log("entries: effect", entries);
        dispatch(sendEntryData(entries));
      }
    }, 1000);
    //
    return () => {
      isInitial = false;
      clearTimeout(entryTimer);
    };
  }, [entries, dispatch]); */

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
              rpe={e.rpe}
            />
          );
        })
      : [];

  /* 
      category: "Weight Lifting",
  */
  const categoryString = entries.entries.length
    ? entries.entries[categoryIndex].category
    : "";


  return (
    <>
      <Routes>
        <Route path="addnew" element={<AddEntryForm />} />
        <Route
          path="settings"
          element={<EntriesSettings />}
        />
      </Routes>
      <div>
        <div>
          <div className={css.categoryHeading}>
            <h3>{categoryString}</h3>
            {formOpen !== "settings" && categoryString && <Link to={`settings`}>settings</Link>}
          </div>
          {entryRows}
        </div>
        {formOpen !== "addnew" && (
          <Link to="addnew">
            <div className={`${css.addItem} iconTextLink`}>
              <span className="material-icons-outlined">add</span>
              <span>Add New</span>
            </div>
          </Link>
        )}
      </div>
    </>
  );
};

export default Entries;
