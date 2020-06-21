import React from "react";

import PlaceList from "../components/PlaceList";

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
];

const UserPlaces = () => {
  return <PlaceList items={DUMMY_PLACES} />;
};

export default UserPlaces;
