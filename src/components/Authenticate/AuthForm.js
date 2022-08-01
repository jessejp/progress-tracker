import React from "react";
import { useParams } from "react-router-dom";
import { sendSignInUser } from "../../store/auth-actions";
import { useDispatch } from "react-redux";
import googleLogo from "../../images/g-logo.png";
import css from "./Authenticate.module.css";

const AuthForm = () => {
  const params = useParams();
  const pageParam = Object.values(params)[0];
  const dispatch = useDispatch();

  const sendForm = (event) => {
    event.preventDefault();

    if (pageParam !== "register") {
      console.log("sent user log in dispatch");
      dispatch(sendSignInUser());
    }
  };

  return (
    <form onSubmit={sendForm}>
      <button className={`${css.googleSignIn}`}>
        <img src={googleLogo} alt="google logo" />
        <span>Sign in with Google</span>
      </button>
    </form>
  );
};

export default AuthForm;
