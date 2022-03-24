import { configureStore } from "@reduxjs/toolkit";
import entriesSlice from "./entries-slice";
import graphDataSlice from "./graph-data-slice";

const store = configureStore({
  reducer: { entries: entriesSlice.reducer, graph: graphDataSlice.reducer },
});

export default store;
