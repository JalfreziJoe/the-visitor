import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UserPlaces = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();
  const userId = useParams().userId;
  useEffect(() => {
    try {
      console.log('[userId] ' + userId);
      const fetchRequest = async () => {
        const resData = await sendRequest(
          `${process.env.REACT_APP_REST_URL}/places/user/${userId}`
        );
        setLoadedPlaces(resData.places);
      };
      fetchRequest();
    } catch (err) {}
  }, [sendRequest, userId]);

  const onDeleteHandler = deletedPlaceId => {
    setLoadedPlaces(prevPlaces =>
      prevPlaces.filter(place => place.id !== deletedPlaceId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDelete={onDeleteHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
