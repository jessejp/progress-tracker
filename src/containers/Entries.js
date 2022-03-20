import { useSelector } from "react-redux";
import css from "./Entries.module.css";
import EntriesRowItem from "./EntriesRowItem";

const Entries = () => {
  const entries = useSelector((state) => state.entries);

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
        enableRPE={e.enableRPE}
      />
    );
  });

  return (
    <div className={css.entriesContainer}>
      <div className={css.entriesTable}>
        <div className={css.templateHeading}>Weight Lifting</div>
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
  );
};

export default Entries;
