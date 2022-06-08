import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "authentication",
    initialState:{
        isLoggedIn: false,
        email: '',
        dataExists: {
            entries: false,
            graphData: false,
        }
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
            state.dataExists.entries = true;
        },
        firestoreGraphDataFound(state) {
            state.dataExists.graphData = true;
        },
    }
})

export const authActions = authSlice.actions;

export default authSlice;