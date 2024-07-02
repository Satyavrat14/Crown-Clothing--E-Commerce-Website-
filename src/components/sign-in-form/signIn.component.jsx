import React, { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../formInput/formInput.component";
import "./signIn.styles.scss";
import Button from "../button/button.component";
import { resolvePath } from "react-router-dom";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      await createUserDocumentFromAuth(user);
    } catch (error) {}
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const Response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(Response);
      setFormFields(defaultFormFields);
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        alert("incorrect password for email");
      } else if (error.code === "auth/user-not-found") {
        alert("no user found");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={changeHandler}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={changeHandler}
          name="password"
          value={password}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
