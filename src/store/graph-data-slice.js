import { createSlice } from "@reduxjs/toolkit";

/* 
  const data = [
    {
    category: "Weight Lifting",
    graphData: [
      {
        name: "Bench",
        mass: [25, 25, 27.5, 30],
        reps: [8, 8, 6, 6],
        sets: [3, 3, 3, 3],
      },
      {
        name: "Military Press",
        mass: [20, 22.5, 25, 25],
        reps: [12, 12, 12, 12],
        sets: [3, 3, 3, 3],
      },
    ],
    },
  ]
*/

const graphDataSlice = createSlice({
  name: "entries",
  initialState: {
    data: [],
  },
  reducers: {
    addData(state, action) {
      const newSubmission = action.payload;
      const category = state.data.findIndex(
        (d) => d.category === newSubmission.category
      );
      const existingData =
        category > -1
          ? state.data[category].graphData.find(
              (d) => d.name === newSubmission.name
            )
          : false;
      if (!existingData && category === -1) {
        state.data.push({
          category: newSubmission.category,
          graphData: [
            {
              name: newSubmission.name,
              mass: [newSubmission.mass],
              reps: [newSubmission.reps],
              sets: [newSubmission.sets],
            },
          ],
        });
      } else if (!existingData && category > -1) {
        state.data[category].graphData.push({
          name: newSubmission.name,
          mass: [newSubmission.mass],
          reps: [newSubmission.reps],
          sets: [newSubmission.sets],
        });
      } else if (existingData) {
        existingData.mass.push(newSubmission.mass);
        existingData.reps.push(newSubmission.reps);
        existingData.sets.push(newSubmission.sets);
      }
    },
  },
});

export const graphDataActions = graphDataSlice.actions;

export default graphDataSlice;
