import React from "react";
import css from "../components/Authenticate/Authenticate.module.css";
import AuthPageLink from "../components/Authenticate/AuthPageLink";
import AuthForm from "../components/Authenticate/AuthForm";
import { Route, Routes } from "react-router-dom";

const Authenticate = () => {
  return (
    <div className={css.loginForm}>
      <AuthForm />
    </div>
  );
};

export default Authenticate;
