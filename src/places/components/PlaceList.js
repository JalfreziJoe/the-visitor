import React from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button/Button";
import PlaceItem from "./PlaceItem";
import classes from "./PlaceList.module.css";

const centerClass = [classes["place-list"], "center"];
const PlaceList = props => {
  if (props.items.length === 0) {
    return (
      <div className={centerClass.join(" ")}>
        <div className="center">
          <Card>
            <h2>No places stored</h2>
            <Button to="/places/new">Create a place</Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <ul className={classes["place-list"]}>
      {props.items.map(place => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
