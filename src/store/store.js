import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import entriesSlice from "./entries-slice";
import graphDataSlice from "./graph-data-slice";

const store = configureStore({
  reducer: { entries: entriesSlice.reducer, graph: graphDataSlice.reducer, auth: authSlice.reducer },
});

export default store;
