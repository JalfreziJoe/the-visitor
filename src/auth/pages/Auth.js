import React, { useContext } from 'react';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import AuthForm from '../components/Authform';
import classes from './Auth.module.css';

const Auth = props => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const formSubmitHandler = async authData => {
    //console.log('[Auth page] ', authData);

    if (!authData.signup) {
      try {
        const resData = await sendRequest(
          `${process.env.REACT_APP_REST_URL}/users/login`,
          'POST',
          JSON.stringify({
            email: authData.email,
            password: authData.pass,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        auth.login(resData.userId, resData.token);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append('email', authData.email);
        formData.append('name', authData.name);
        formData.append('password', authData.pass);
        formData.append('image', authData.image);
        const resData = await sendRequest(
          `${process.env.REACT_APP_REST_URL}/api/users/signup`,
          'POST',
          formData
        );

        auth.login(resData.userId, resData.token);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const errorHandler = () => {
    clearError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <div className={classes['auth-page']}>
        {isLoading && <LoadingSpinner asOverlay />}
        <AuthForm
          header="Login to your account"
          signup={false}
          className={classes['form-box']}
          formSubmit={formSubmitHandler}
          initValues={{
            email: {
              value: '',
              isValid: false,
            },
            pass: {
              value: '',
              isValid: false,
            },
            formType: {
              value: 'login',
              isValid: true,
            },
          }}
        />
        <AuthForm
          header="Sign up for access"
          signup
          className={classes['form-box']}
          formSubmit={formSubmitHandler}
          initValues={{
            name: {
              value: '',
              isValid: false,
            },
            emailSignup: {
              value: '',
              isValid: false,
            },
            passSignup: {
              value: '',
              isValid: false,
            },
            image: {
              value: null,
              isValid: false,
            },
            formType: {
              value: 'login',
              isValid: true,
            },
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default Auth;
