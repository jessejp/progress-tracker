import { createSlice } from "@reduxjs/toolkit";

const entriesData = [
  {
    category: "Weight Lifting",
    name: "Bench",
    mass: "25",
    reps: "8",
    sets: "3",
    enableRPE: true,
  },
  {
    category: "Weight Lifting",
    name: "Military Press",
    mass: "20",
    reps: "12",
    sets: "3",
    enableRPE: false,
  },
  {
    category: "Weight Lifting",
    name: "Bulgarian Split Squats",
    mass: "35",
    reps: "20",
    sets: "3",
    enableRPE: true,
  },
];

const entriesSlice = createSlice({
  name: "entries",
  initialState: {
    entries: entriesData,
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
          enableRPE: newEntry.enableRPE,
        });
      }
    },
  },
});

export const entryActions = entriesSlice.actions;

export default entriesSlice;
