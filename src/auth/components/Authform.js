import React from "react";

import Input from "../../shared/components/FormElements/Inputs/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../util/validators";
import { useForm } from "../../shared/hooks/formhook";
import classes from "./Authform.module.css";

const Authform = props => {
  const [formState, onInputHandler] = useForm(props.initValues, false);

  const formSubmitHandler = event => {
    event.preventDefault();
    const authData = {
      email: formState.inputs.email
        ? formState.inputs.email.value
        : formState.inputs.emailSignup.value,
      pass: formState.inputs.pass
        ? formState.inputs.pass.value
        : formState.inputs.passSignup.value,
      signup: props.signup,
    };
    props.formSubmit(authData);
  };

  return (
    <React.Fragment>
      <h3>{props.header}</h3>
      <form
        className={`${props.className} ${classes["auth-form"]}`}
        onSubmit={formSubmitHandler}
      >
        <Input
          id={props.signup ? "emailSignup" : "email"}
          type="input"
          placeholder="email"
          label={props.signup ? "Email address" : "Login email address"}
          errorText={
            props.signup
              ? "Please enter an email address"
              : "Please enter your login email address"
          }
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          onInput={onInputHandler}
        />
        <Input
          id={props.signup ? "passSignup" : "pass"}
          type="password"
          placeholder="password"
          label="Password"
          errorText="Enter your password"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          onInput={onInputHandler}
        />
        <Button disabled={!formState.isValid}>
          {props.signup ? "Signup" : "Login"}
        </Button>
      </form>
    </React.Fragment>
  );
};

export default Authform;
