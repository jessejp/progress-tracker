import React from "react";

const DataContext = React.createContext({
  entries: [],
  totalAmount: 0,
  addEntry: (entry) => {},
});

export default DataContext;
