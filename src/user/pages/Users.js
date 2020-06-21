import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Luke Skywalker",
      image:
        "https://images.pexels.com/photos/818261/pexels-photo-818261.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      places: "5",
    },
  ];

  return <UsersList users={USERS} />;
};

export default Users;
