import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { sendRegisterUser, sendSignInUser } from "../../store/auth-actions";
import { useDispatch } from "react-redux";

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
      <button>Login with Google</button>
    </form>
  );
};

export default AuthForm;
