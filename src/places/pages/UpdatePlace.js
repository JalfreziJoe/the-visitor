import React, { useEffect, useState } from "react";

import Input from "../../shared/components/FormElements/Inputs/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import { useForm } from "../../shared/hooks/formhook";
import { useParams } from "react-router-dom";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../util/validators";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Big Ben",
    description:
      "Big Ben is the nickname for the Great Bell of the striking clock at the north end of the Palace of Westminster in London and is usually extended to refer to both the clock and the clock tower. ",
    imageUrl:
      "https://cdn.londonandpartners.com/visit/london-organisations/big-ben/100225-640x360-elisabeth-tower-clock-face-640.jpg",
    address: "Westminster, London SW1A 0AA",
    location: {
      lat: "51.5007292",
      lon: "-0.1268141",
    },
    creator: "u2",
  },
  {
    id: "p2",
    title: "Big Ben",
    description:
      "Big Ben is the nickname for the Great Bell of the striking clock at the north end of the Palace of Westminster in London and is usually extended to refer to both the clock and the clock tower. ",
    imageUrl:
      "https://cdn.londonandpartners.com/visit/london-organisations/big-ben/100225-640x360-elisabeth-tower-clock-face-640.jpg",
    address: "Westminster, London SW1A 0AA",
    location: {
      lat: "51.5007292",
      lon: "-0.1268141",
    },
    creator: "u1",
  },
];

const UpdatePlace = props => {
  const param_placeId = useParams().placeId;

  const [isLoading, setIsLoading] = useState(true);
  const [formState, onInputHandler, setFormData] = useForm(
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

  const identified_placeId = DUMMY_PLACES.find(p => p.id === param_placeId);

  useEffect(() => {
    if (identified_placeId) {
      setFormData(
        {
          title: {
            value: identified_placeId.title,
            isValid: true,
          },
          description: {
            value: identified_placeId.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identified_placeId]);

  if (!identified_placeId) {
    return (
      <div className="center">
        <h2>Can't find this place</h2>
      </div>
    );
  }

  const onSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={onSubmitHandler}>
      <Input
        id="title"
        type="input"
        placeholder="title"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter title"
        onInput={onInputHandler}
        initValue={formState.inputs.title.value}
        initIsValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        type="textarea"
        placeholder="description"
        label="Descript"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter description"
        onInput={onInputHandler}
        initValue={formState.inputs.description.value}
        initIsValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Update place
      </Button>
    </form>
  );
};

export default UpdatePlace;
