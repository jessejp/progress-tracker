import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import css from "./Entries.module.css";
import { entryActions } from "../../store/entries-slice";
import { graphDataActions } from "../../store/graph-data-slice";
import { uiActions } from "../../store/ui-slice";

const EntriesDeleteItem = (props) => {
  const [showDeleteCheck, setShowDeleteCheck] = useState(false);
  const dispatch = useDispatch();

  const deleteCheck = () => {
    setShowDeleteCheck((state) => (state = !state));
  };

  const deleteEntry = () => {
    dispatch(
      entryActions.deleteEntry({ name: props.name, category: props.category })
    );
    dispatch(
      graphDataActions.deleteData(
        { name: props.name, category: props.category, deletionType: 'complete' }
      )
    );
    dispatch(uiActions.unsavedEntriesData());
    dispatch(uiActions.unsavedGraphData());
  };

  return (
    <div className={css.flexWrapper}>
      {!showDeleteCheck && (
        <>
          <div className={`${css.flexItem} ${css.entryName}`}>{props.name}</div>
          <div className={`${css.flexItem} ${css.entryName}`}></div>
          <div className={`${css.flexItem} ${css.entryName}`}>
            <button
              className={`${css.deleteButton} generic`}
              name={props.name}
              onClick={deleteCheck}
            >
              Delete Entry
            </button>
          </div>
        </>
      )}
      {showDeleteCheck && (
        <>
          <div className={`${css.flexItem} ${css.entryName}`}>{props.name}</div>
          <div className={`${css.flexItem}`}>
            <div><p className="delete">Are you sure?</p></div>
            <button
              className={`${css.deleteButton} generic delete`}
              name={props.name}
              onClick={deleteEntry}
            >
              Yes. Delete.
            </button>
          </div>
          <div className={`${css.flexItem} ${css.entryName}`}>
            <button
              className={`generic`}
              name={props.name}
              onClick={deleteCheck}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EntriesDeleteItem;
