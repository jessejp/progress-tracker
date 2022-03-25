import { createSlice } from "@reduxjs/toolkit";

/* const entriesData = [
  {
    category: "Weight Lifting",
    name: "Bench",
    mass: "25",
    reps: "8",
    sets: "3",
  },
  {
    category: "Weight Lifting",
    name: "Military Press",
    mass: "20",
    reps: "12",
    sets: "3",
  },
  {
    category: "Weight Lifting",
    name: "Bulgarian Split Squats",
    mass: "35",
    reps: "20",
    sets: "3",
  },
]; */

const entriesSlice = createSlice({
  name: "entries",
  initialState: {
    entries: [],
  },
  reducers: {
    addEntry(state, action) {
      const newEntry = action.payload;
      const existingEntry = state.entries.find(
        (entry) => entry.name === newEntry.name
      );
      if (!existingEntry) {
        state.entries.push({
          category: "Weight Lifting",
          name: newEntry.name,
          mass: newEntry.mass,
          reps: newEntry.reps,
          sets: newEntry.sets,
        });
      }
    },
  },
});

export const entryActions = entriesSlice.actions;

export default entriesSlice;
