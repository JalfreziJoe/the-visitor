import React from 'react';

import Input from '../../shared/components/FormElements/Inputs/Input';
import Button from '../../shared/components/FormElements/Button/Button';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../util/validators';
import { useForm } from '../../shared/hooks/formhook';
import classes from './Authform.module.css';

const Authform = props => {
  const [formState, onInputHandler] = useForm(props.initValues, false);

  const formSubmitHandler = event => {
    event.preventDefault();
    let authData;
    if (props.signup) {
      authData = {
        name: formState.inputs.name.value,
        email: formState.inputs.emailSignup.value,
        pass: formState.inputs.passSignup.value,
        image: formState.inputs.image.value,
        signup: props.signup,
      };
    } else {
      authData = {
        name: undefined,
        email: formState.inputs.email.value,
        pass: formState.inputs.pass.value,
        image: undefined,
        signup: props.signup,
      };
    }
    props.formSubmit(authData);
  };

  const nameInput = props.signup ? (
    <Input
      id="name"
      type="input"
      placeholder="name"
      label="Full Name"
      errorText="Please enter your name"
      validators={[VALIDATOR_REQUIRE()]}
      onInput={onInputHandler}
    />
  ) : null;

  return (
    <React.Fragment>
      <h3>{props.header}</h3>
      <form
        className={`${props.className} ${classes['auth-form']}`}
        onSubmit={formSubmitHandler}
      >
        {nameInput}
        <Input
          id={props.signup ? 'emailSignup' : 'email'}
          type="input"
          placeholder="email"
          label={props.signup ? 'Email address' : 'Login email address'}
          errorText={
            props.signup
              ? 'Please enter an email address'
              : 'Please enter your login email address'
          }
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          onInput={onInputHandler}
        />
        <Input
          id={props.signup ? 'passSignup' : 'pass'}
          type="password"
          placeholder="password"
          label="Password"
          errorText="Enter your password"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          onInput={onInputHandler}
        />
        {props.signup && (
          <ImageUpload center id="image" onInput={onInputHandler} />
        )}
        <Button disabled={!formState.isValid}>
          {props.signup ? 'Signup' : 'Login'}
        </Button>
      </form>
    </React.Fragment>
  );
};

export default Authform;
