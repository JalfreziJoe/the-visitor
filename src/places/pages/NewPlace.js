import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './PlaceForm.css';

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../util/validators';
import { useForm } from '../../shared/hooks/formhook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import Input from '../../shared/components/FormElements/Inputs/Input';
import Button from '../../shared/components/FormElements/Button/Button';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const NewPlace = () => {
  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const routing = useHistory();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('image', formState.inputs.image.value);
      await sendRequest(
        `${process.env.REACT_APP_REST_URL}/places`,
        'POST',
        formData,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );
      routing.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
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
        <Input
          id="address"
          type="input"
          placeholder="Address"
          label="Address"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter an address"
          onInput={onInputHandler}
        />
        <ImageUpload center id="image" onInput={onInputHandler} />
        <Button type="submit" disabled={!formState.isValid}>
          Add Place
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
