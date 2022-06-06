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
        RPE: ['No Data', 5, 8, 8],
        date: [{day: 25, month: 4, year: 2022, week: 18, weekday: 1}],
      },
      {
        name: "Military Press",
        mass: [20, 22.5, 25, 25],
        reps: [12, 12, 12, 12],
        sets: [3, 3, 3, 3],
        RPE: ['No Data', 5, 8, 8],
        date: [{day: 25, month: 4, year: 2022, week: 18, weekday: 1}],
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
    inititalizeNewUserGraph(state, action) {
      state.data.push({
        category: "Weight Training",
        graphData: [],
        userid: action.payload.userid,
      });
    },
    replaceGraphData(state, action) {
      state.data = action.payload.data;
    },
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

      const newSubmissionDate = action.payload.date.split("T")[0].split("-");

      if (!existingData && category === -1) {
        state.data.push({
          category: newSubmission.category,
          graphData: [
            {
              name: newSubmission.name,
              mass: [newSubmission.mass],
              reps: [newSubmission.reps],
              sets: [newSubmission.sets],
              rpe: [newSubmission.rpe],
              date: [
                {
                  day: +newSubmissionDate[2],
                  month: +newSubmissionDate[1],
                  year: +newSubmissionDate[0],
                  week: action.payload.week,
                  weekday: action.payload.weekday,
                },
              ],
            },
          ],
        });
      } else if (!existingData && category > -1) {
        state.data[category].graphData.push({
          name: newSubmission.name,
          mass: [newSubmission.mass],
          reps: [newSubmission.reps],
          sets: [newSubmission.sets],
          rpe: [newSubmission.rpe],
          date: [
            {
              day: +newSubmissionDate[2],
              month: +newSubmissionDate[1],
              year: +newSubmissionDate[0],
              week: action.payload.week,
              weekday: action.payload.weekday,
            },
          ],
        });
      } else if (existingData) {
        existingData.mass.push(newSubmission.mass);
        existingData.reps.push(newSubmission.reps);
        existingData.sets.push(newSubmission.sets);
        existingData.rpe.push(newSubmission.rpe);
        existingData.date.push({
          day: +newSubmissionDate[2],
          month: +newSubmissionDate[1],
          year: +newSubmissionDate[0],
          week: action.payload.week,
          weekday: action.payload.weekday,
        });
      }
    },
  },
});

export const graphDataActions = graphDataSlice.actions;

export default graphDataSlice;
