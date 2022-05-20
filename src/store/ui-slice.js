import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    currentWeek: 0,
    unsavedData: false,
    graphLoaded: false,
  },
  reducers: {
    unsavedData(state) {
      state.unsavedData = true;
    },
    saveData(state) {
      state.unsavedData = false;
    },
    graphUnloaded(state) {
      state.graphLoaded = false;
    },
    graphLoaded(state) {
      state.graphLoaded = true;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;