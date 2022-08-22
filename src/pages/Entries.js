import { useSelector } from "react-redux";
import css from "../components/Entries/Entries.module.css";
import EntriesRowItem from "../components/Entries/EntriesRowItem";
import { Routes, Route, Link, useParams } from "react-router-dom";
import AddEntryForm from "../components/AddNewEntry/AddEntryForm";
import EntriesSettings from "../components/Entries/EntriesSettings";
import EntriesDeleteItem from "../components/Entries/EntriesDeleteItem";

const Entries = () => {
  const entries = useSelector((state) => state.entries);
  const params = useParams();
  const formOpen = Object.values(params)[0];
  const categoryIndex = 0;

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

  const categoryString = entries.entries.length
    ? entries.entries[categoryIndex].category
    : "";

  const deleteEntryRows =
    entries.entries.length > 0
      ? entries.entries[categoryIndex].entryData.map((e, index) => {
          return (
            <EntriesDeleteItem
              id={`${entries.entries[categoryIndex].category}_${e.name}`}
              key={`${entries.entries[categoryIndex].category}_${e.name}`}
              index={index}
              category={entries.entries[categoryIndex].category}
              name={e.name}
            />
          );
        })
      : [];

  return (
    <>
      <Routes>
        <Route path="addnew" element={<AddEntryForm />} />
        <Route path="settings" element={<EntriesSettings />} />
      </Routes>
      <div>
        <div>
          <div className={css.categoryHeading}>
            <h3>{categoryString}</h3>
            {formOpen !== "settings" && categoryString && (
              <div className={css.categoryHeadingLinks}>
                <Link to={`settings`}>settings</Link>

                <div className={`${css.addItem} iconTextLink`}>
                  <Link to="addnew">
                    <span className="material-icons-outlined">add</span>
                    <span>Add New</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
          {formOpen !== "settings" && entryRows}
          {formOpen === "settings" && deleteEntryRows}
        </div>
        {formOpen !== "addnew" && (
          <div className={`${css.addItem} iconTextLink`}>
            <Link to="addnew">
              <span className="material-icons-outlined">add</span>
              <span>Add New</span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Entries;
