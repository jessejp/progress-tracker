import { createSlice } from "@reduxjs/toolkit";

const graphDataSlice = createSlice({
  name: "entries",
  initialState: {
    data: [],
  },
  reducers: {
    addData(state, action) {
      const newSubmission = action.payload;
      const existingData = state.data.find(
        (d) => d.name === newSubmission.name
      );
      if (!existingData) {
        state.data.push({
          name: newSubmission.name,
          mass: [newSubmission.mass],
          reps: [newSubmission.reps],
          sets: [newSubmission.sets],
        });
      } else {
        existingData.mass.push(newSubmission.mass);
        existingData.reps.push(newSubmission.reps);
        existingData.sets.push(newSubmission.sets);
      }
    },
  },
});

export const graphDataActions = graphDataSlice.actions;

export default graphDataSlice;
