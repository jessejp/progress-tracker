import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "authentication",
    initialState:{
        isLoggedIn: false,
        token: '',
        email: '',
    },
    reducers: {
        loginUser(state, action) {
            state.token = action.payload.token;
            state.isLoggedIn = true;
            state.email = action.payload.email;
        },
    }
})

export const authActions = authSlice.actions;

export default authSlice;