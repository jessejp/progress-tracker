import { useState } from "react";
import css from "./Entries.module.css";
import EntriesRowItem from "./EntriesRowItem";

const entriesData = [
  {
    category: "Weight Lifting",
    name: "Bench",
    vol: "25",
    reps: "8",
    sets: "3",
    enableColorKeys: true,
  },
  {
    category: "Weight Lifting",
    name: "Military Press",
    vol: "20",
    reps: "12",
    sets: "3",
    enableColorKeys: false,
  },
  {
    category: "Weight Lifting",
    name: "Bulgarian Split Squats",
    vol: "35",
    reps: "20",
    sets: "3",
    enableColorKeys: true,
  },
];

const Entries = () => {
  const [entries, setEntries] = useState(entriesData);
  const [savedData, setSavedData] = useState([]);

  // save new data entry to state, used for data visualisation
  const dataEntry = (name, vol, reps, sets) => {
    const newEntry = [name, vol, reps, sets];
    setSavedData((prevState) => {
      return [...prevState, newEntry];
    });
  };

  const updateEntryDataHandler = (updatedEntry) => {
    /* setEntries(prevEntries => {

    }); */
    console.log(updatedEntry);
  };

  // map table rows
  const entryRows = entries.map((e, index) => {
    return (
      <EntriesRowItem
        id={`${e.category}_${e.name}`}
        key={`${e.category}_${e.name}`}
        index={index}
        name={e.name}
        vol={e.vol}
        reps={e.reps}
        sets={e.sets}
        enableColorKeys={e.enableColorKeys}
        onDataSubmit={dataEntry}
        onUpdateEntryData={updateEntryDataHandler}
      />
    );
  });

  return (
    <div className={css.entriesContainer}>
      <div className={css.entriesTable}>
        <div className={css.templateHeading}>Weight Lifting</div>
        <div className={css.row}>
          <div className={css.col}>Name</div>
          <div className={css.col}>Vol</div>
          <div className={css.col}>Reps</div>
          <div className={css.col}>Sets</div>
          <div className={css.col}></div>
        </div>
        {entryRows}
      </div>
    </div>
  );
};

export default Entries;
