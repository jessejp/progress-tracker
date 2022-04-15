import { createSlice } from "@reduxjs/toolkit";

/* const entries = [
  {
    category: "Weight Lifting",
    entryData:[
    {
      name: "Bench",
      mass: "25",
      reps: "8",
      sets: "3",
    },
    {
      name: "Military Press",
      mass: "20",
      reps: "12",
      sets: "3",
    }, 
    {
      name: "Bulgarian Split Squats",
      mass: "35",
      reps: "20",
      sets: "3",
    }],
  ]; */

const entriesSlice = createSlice({
  name: "entries",
  initialState: {
    entries: [],
  },
  reducers: {
    addEntry(state, action) {
      const newEntry = action.payload;
      const category = state.entries.findIndex(
        (entry) => entry.category === newEntry.category
      );
      const existingEntry =
        category > -1
          ? state.entries[category].entryData.find(
              (entry) => entry.name === newEntry.name
            )
          : false;
      if (category === -1) {
        state.entries.push({
          category: newEntry.category,
          entryData: [
            {
              name: newEntry.name,
              mass: newEntry.mass,
              reps: newEntry.reps,
              sets: newEntry.sets,
            },
          ],
        });
      } else if (!existingEntry && category > -1) {
        state.entries[category].entryData.push({
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
