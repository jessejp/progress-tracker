import { configureStore } from "@reduxjs/toolkit";
import entriesSlice from "./entries-slice";

const store = configureStore({
  reducer: entriesSlice.reducer,
});

export default store;
