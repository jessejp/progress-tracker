/* import axios from "axios"; */
import { authActions } from "./auth-slice";
/* import { APIKEY } from "../strings/APIJSON"; */
import { graphDataActions } from "./graph-data-slice";
import { entryActions } from "./entries-slice";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

/* const api = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1",
}); */

const auth = getAuth();
const provider = new GoogleAuthProvider();

/* export const sendRegisterUser = (newUser) => {
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
 */

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

export const sendRegisterUser = (newUser) => {
  return async (dispatch) => {
    createUserWithEmailAndPassword(
      auth,
      newUser.enteredEmail,
      newUser.enteredPassword
    )
      .then((userCredential) => {
        // Signed in
        console.log("Signed in");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode, errorMessage);
      });
  };
};

/* export const sendSignInUser = (user) => {
  return async (dispatch) => {
    signInWithEmailAndPassword(auth, user.enteredEmail, user.enteredPassword)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential.user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
}; */

export const sendSignInUser = () => {
  return async (dispatch) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const userRes = result.user;
        console.log(userRes);
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

/* 
export const sendSignInUser = (user) => {
  return async (dispatch) => {
    await api
      .post(`/accounts:signInWithPassword?key=${APIKEY}`, {
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
        console.log(data);
        dispatch(
          authActions.loginUser({
            token: data.data.idToken,
            email: data.data.email,
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
}; */
