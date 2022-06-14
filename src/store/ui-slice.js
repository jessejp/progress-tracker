import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    currentWeek: 0,
    unsavedData: {
      unsavedEntries: false,
      unsavedGraph: false,
    }
  },
  reducers: {
    unsavedEntriesData(state) {
      state.unsavedData.unsavedEntries = true;
    },
    saveEntriesData(state) {
      state.unsavedData.unsavedEntries = false;
    },
    unsavedGraphData(state) {
      state.unsavedData.unsavedGraph = true;
    },
    saveGraphData(state) {
      state.unsavedData.unsavedGraph = false;
    },
    initCurrentWeek(state, action) {
      state.currentWeek = action.payload.week;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
