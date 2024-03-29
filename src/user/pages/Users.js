import React, { useEffect, useState } from 'react';
import UsersList from '../components/UsersList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const sendingRequest = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_REST_URL}/users`
        );

        setLoadedUsers(response.users);
      } catch (err) {}
    };
    sendingRequest();
  }, [sendRequest]);

  const handleError = () => {
    clearError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={handleError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList users={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
