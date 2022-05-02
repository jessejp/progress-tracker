import axios from "axios";
import { authActions } from "./auth-slice";
import { APIKEY } from "../strings/APIJSON";

const api = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1",
});

export const sendRegisterUser = (newUser) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      await api.post(`/accounts:signUp?key=${APIKEY}`, {
        email: newUser.enteredEmail,
        password: newUser.enteredPassword,
        returnSecureToken: true,
      });
    };

    try {
      console.log("registering new user...");
      await sendRequest();
    } catch (error) {
      console.log("sendRegisterUser", error);
    }
  };
};

export const sendSignInUser = (user) => {
  return async (dispatch) => {
    await api.post(`/accounts:signInWithPassword?key=${APIKEY}`, {
        email: user.enteredEmail,
        password: user.enteredPassword,
        returnSecureToken: true,
      })
      .then((res) => {
        if (res) {
          return res;
        } else {
          return res.then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        dispatch(authActions.loginUser({ token: data.data.idToken, email: data.data.email }));
      })
      .catch((err) => {
        console.log(err.message);
      });
    /* if (res) {
        dispatch(authActions.loginUser({ idToken: res.idToken }));
      } else {
        throw new Error("Authentication Failed!");
      } */
  };
};
