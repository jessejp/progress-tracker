import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    isLoggedIn: false,
    email: "",
    dataInitialized: {
      entriesInitialized: false,
      graphDataInitialized: false,
    },
    dataFound: {
      entriesFound: false,
      graphDataFound: false,
    },
  },
  reducers: {
    loginUser(state, action) {
      state.isLoggedIn = true;
      state.email = action.payload.email;
    },
    logoutUser(state) {
      state.isLoggedIn = false;
      state.email = "";
    },
    firestoreEntriesFound(state) {
      state.dataFound.entriesFound = true;
    },
    firestoreGraphDataFound(state) {
      state.dataFound.graphDataFound = true;
    },
    firestoreEntriesInitialized(state) {
      state.dataInitialized.entriesInitialized = true;
    },
    firestoreGraphDataInitialized(state) {
      state.dataInitialized.graphDataInitialized = true;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
