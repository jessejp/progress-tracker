/* import axios from "axios"; */
import { authActions } from "./auth-slice";
/* import { APIKEY } from "../strings/APIJSON"; */
import { graphDataActions } from "./graph-data-slice";
import { entryActions } from "./entries-slice";
import { auth } from "../firebase-config";

import {
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export const authStateObserver = () => {
  return async (dispatch) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("onauthstatechanged:", user ? true : false);
        dispatch(authActions.loginUser({ email: user.email }));
      } else {
        console.log("onauthstatechanged: user not logged in");
        dispatch(authActions.logoutUser());
      }
    });
  };
};

export const signOutUser = () => {
  return async (dispatch) => {
    signOut(auth)
      .then(() => {
        dispatch(authActions.logoutUser());
        dispatch(entryActions.replaceEntries({ entries: [] }));
        dispatch(graphDataActions.replaceGraphData({ data: [] }));
        console.log("Logged user out.");
      })
      .catch((e) => console.log(e));
  };
};

export const sendSignInUser = () => {
  return async (dispatch) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const userRes = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...;
      });
  };
};
