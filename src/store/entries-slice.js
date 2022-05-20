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
      rpe: "1"
    },
    {
      name: "Military Press",
      mass: "20",
      reps: "12",
      sets: "3",
      rpe: "1"
    }, 
    {
      name: "Bulgarian Split Squats",
      mass: "35",
      reps: "20",
      sets: "3",
      rpe: "1"
    }],
    settings: {
      stepIntervalMass: 2.5,
      stepIntervalReps: 1,
      stepIntervalSets: 1,
      enableRPE: true,
      colorMarker: false,
    }
  }
  ]; 
  
   initialState: {
    entries: [{
      category: '',
      entryData: [],
      settings: {
        stepsIntervalMass: 2.5,
        stepIntervalReps: 1,
        stepIntervalSets: 1,
        enableRPE: false,
        colorMarker: false,
      }
    }],
  },
  */

const entriesSlice = createSlice({
  name: "entries",
  initialState: {
    entries: [],
  },
  reducers: {
    replaceEntries(state, action) {
      state.entries = action.payload.entries;
    },
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
              rpe: 0,
            },
          ],
          settings: {
            stepIntervalMass: 2.5,
            stepIntervalReps: 1,
            stepIntervalSets: 1,
            enableRPE: true,
          },
        });
      } else if (!existingEntry && category > -1) {
        state.entries[category].entryData.push({
          name: newEntry.name,
          mass: newEntry.mass,
          reps: newEntry.reps,
          sets: newEntry.sets,
          rpe: 0,
        });
      } else if (existingEntry) {
        existingEntry.mass = newEntry.mass;
        existingEntry.reps = newEntry.reps;
        existingEntry.sets = newEntry.sets;
        existingEntry.rpe = newEntry.rpe;
      }
    },
    updateSettings(state, action) {
      const newSettings = action.payload.settings;
      const category = state.entries.findIndex(
        (entry) => entry.category === action.payload.category
      );
      if (
        category > -1 &&
        newSettings.stepIntervalMass &&
        newSettings.stepIntervalReps &&
        newSettings.stepIntervalSets
      ) {
        console.log("settings updated");
        state.entries[category].settings = {
          stepIntervalMass: newSettings.stepIntervalMass,
          stepIntervalReps: newSettings.stepIntervalReps,
          stepIntervalSets: newSettings.stepIntervalSets,
          enableRPE: newSettings.enableRPE,
        };
      }
    },
  },
});

export const entryActions = entriesSlice.actions;

export default entriesSlice;
