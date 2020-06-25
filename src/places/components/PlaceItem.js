import React, { useState, useContext } from "react";

import { AuthContext } from "../../shared/context/auth-context";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import classes from "./PlaceItem.module.css";

const PlaceItem = props => {
  const auth = useContext(AuthContext);
  const [mapSwitch, setMapSwitch] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openMapHandler = () => {
    setMapSwitch(true);
  };
  const closeMapHandler = () => {
    setMapSwitch(false);
  };

  const openDeleteModalHandler = () => {
    setShowDeleteModal(true);
  };

  const cancelDeleteModalHandler = () => {
    setShowDeleteModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowDeleteModal(false);
    console.log("Delete confirmed");
  };

  return (
    <React.Fragment>
      <Modal
        contentClass={classes["place-item__modal-content"]}
        footerClass={classes["place-item__modal-actions"]}
        header={props.address}
        cancel={closeMapHandler}
        footerContent={<Button onClick={closeMapHandler}>Close</Button>}
        show={mapSwitch}
      >
        <div className={classes["map-container"]}>
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        header="Are you sure"
        show={showDeleteModal}
        footerClass={classes["place-item__modal-actions"]}
        footerContent={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteModalHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you really want to delete this place?</p>
      </Modal>
      <li className={classes["place-item"]}>
        <Card className={classes["place-item__content"]}>
          <div className={classes["place-item__image"]}>
            <img src={props.image} alt={props.title} />
          </div>
          <div className={classes["place-item__info"]}>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className={classes["place-item__actions"]}>
            <Button inverse onClick={openMapHandler}>
              View on map
            </Button>
            {auth.isLoggedIn && (
              <Button to={`/places/${props.id}`}>Edit</Button>
            )}
            {auth.isLoggedIn && (
              <Button danger onClick={openDeleteModalHandler}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
