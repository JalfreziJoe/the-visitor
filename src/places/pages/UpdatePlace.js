import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Inputs/Input';
import Button from '../../shared/components/FormElements/Button/Button';
import { AuthContext } from '../../shared/context/auth-context';
import { useForm } from '../../shared/hooks/formhook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useParams } from 'react-router-dom';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../util/validators';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UpdatePlace = props => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const param_placeId = useParams().placeId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  //const [isLoading, setIsLoading] = useState(true);
  const [formState, onInputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await sendRequest(
          `${process.env.REACT_APP_REST_URL}/places/${param_placeId}`
        );
        setLoadedPlace(resData.place);
        setFormData(
          {
            title: {
              value: resData.place.title,
              isValid: true,
            },
            description: {
              value: resData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchData();

    //setIsLoading(false);
  }, [sendRequest, setFormData, param_placeId]);

  const onSubmitHandler = async event => {
    console.log('[onSumbitHandler] update');
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_REST_URL}/places/${param_placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      history.push('/' + auth.userId + '/places');
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !isLoading) {
    return (
      <div className="center">
        <h2>Can't find this place</h2>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={onSubmitHandler}>
          <Input
            id="title"
            type="input"
            placeholder="title"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter title"
            onInput={onInputHandler}
            initValue={loadedPlace.title}
            initIsValid={true}
          />
          <Input
            id="description"
            type="textarea"
            placeholder="description"
            label="Description"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter description"
            onInput={onInputHandler}
            initValue={loadedPlace.description}
            initIsValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Update place
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
