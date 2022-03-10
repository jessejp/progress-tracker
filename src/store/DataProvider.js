import { useReducer } from "react";
import DataContext from "./data-context";

const defaultDataState = {
  entries: [],
  totalAmount: 0,
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        entries: [
          {
            name: action.entry.name,
            vol: action.entry.vol,
            reps: action.entry.reps,
            sets: action.entry.sets,
          },
        ],
        totalAmount: state.totalAmount++,
      };
    default:
      throw new Error();
  }
};

const DataProvider = (props) => {
  const [dataState, dispatchDataAction] = useReducer(
    dataReducer,
    defaultDataState
  );

  const addEntryHandler = (entry) => {
    dispatchDataAction({ type: "ADD", entry: entry });
  };

  const dataContext = {
    entries: dataState.entries,
    totalAmount: dataState.totalAmount,
    addEntry: addEntryHandler,
  };

  return (
    <DataContext.Provider value={dataContext}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
