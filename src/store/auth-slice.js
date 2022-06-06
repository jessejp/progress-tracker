import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "authentication",
    initialState:{
        isLoggedIn: false,
        email: '',
        uid: ''
    },
    reducers: {
        loginUser(state, action) {
            state.isLoggedIn = true;
            state.email = action.payload.email;
            state.uid = action.payload.uid;
        },
        logoutUser(state) {
            state.isLoggedIn = false;
            state.email = "";
            state.uid = "";
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice;