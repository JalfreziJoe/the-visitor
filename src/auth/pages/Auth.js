import React, { useContext } from "react";

import { AuthContext } from "../../shared/context/auth-context";
import AuthForm from "../components/Authform";
import classes from "./Auth.module.css";

const Auth = props => {
  const auth = useContext(AuthContext);
  const formSubmitHandler = authData => {
    console.log("[Auth page] ", authData);
    if (!authData.signup) {
      auth.login();
    }
  };

  return (
    <React.Fragment>
      <div className={classes["auth-page"]}>
        <AuthForm
          header="Login to your account"
          signup={false}
          className={classes["form-box"]}
          formSubmit={formSubmitHandler}
          initValues={{
            email: {
              value: "",
              isValid: false,
            },
            pass: {
              value: "",
              isValid: false,
            },
            formType: {
              value: "login",
              isValid: true,
            },
          }}
        />
        <AuthForm
          header="Sign up for access"
          signup
          className={classes["form-box"]}
          formSubmit={formSubmitHandler}
          initValues={{
            emailSignup: {
              value: "",
              isValid: false,
            },
            passSignup: {
              value: "",
              isValid: false,
            },
            formType: {
              value: "login",
              isValid: true,
            },
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default Auth;
