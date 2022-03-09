import { useReducer } from "react";
import DataContext from "./data-context";

const defaultDataState = {
  entries: [],
  totalAmount: 0,
};

const dataReducer = (state, action) => {
  if (action.type === "ADD") {
    return {
      entries: [
        {
          name: action.name,
          vol: 12,
          reps: 8,
          sets: 5,
        },
      ],
      totalAmount: state.totalAmount++,
    };
  }
  return defaultDataState;
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
