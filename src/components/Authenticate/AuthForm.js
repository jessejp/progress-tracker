import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { sendRegisterUser, sendSignInUser } from "../../store/auth-actions";
import { useDispatch } from "react-redux";

const AuthForm = () => {
  const params = useParams();
  const pageParam = Object.values(params)[0];
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();

  const sendForm = (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = emailRef.current.value;

    if (pageParam === "register" && enteredEmail && enteredPassword) {
      console.log("sent user register dispatch");

      dispatch(sendRegisterUser({ enteredEmail, enteredPassword }));

    } else if (pageParam !== "register" && enteredEmail && enteredPassword) {
      console.log("sent user log in dispatch");

      dispatch(sendSignInUser({ enteredEmail, enteredPassword }));
    }

    passwordRef.current.value = "";
  };

  return (
    <form onSubmit={sendForm}>
      <label>Email</label>
      <input type="text" ref={emailRef} />

      <label>Password</label>
      <input type="password" ref={passwordRef} />

      <button>
        {pageParam === "register" && "Register"}
        {pageParam !== "register" && "Login"}
      </button>
    </form>
  );
};

export default AuthForm;
