import React from "react";
import "./PlaceForm.css";

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../util/validators";
import { useForm } from "../../shared/hooks/formhook";
import Input from "../../shared/components/FormElements/Inputs/Input";
import Button from "../../shared/components/FormElements/Button/Button";

const NewPlace = () => {
  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        type="input"
        placeholder="title"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter title"
        onInput={onInputHandler}
      />
      <Input
        id="description"
        type="textarea"
        placeholder="description"
        label="Description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a description"
        onInput={onInputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Add Place
      </Button>
    </form>
  );
};

export default NewPlace;
