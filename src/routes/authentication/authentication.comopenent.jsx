import React from "react";
import SignUpForm from "../../components/sign-up-form/signUp.component";
import SignInForm from "../../components/sign-in-form/signIn.component";
import "./authentication.styles.scss";
const Authentication = () => {
  return (
    <div className="auth-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
