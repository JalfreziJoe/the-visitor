import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import Button from "../../../shared/components/FormElements/Button/Button";

import classes from "./NavLinks.module.css";

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    <ul className={classes["nav-links"]}>
      <li>
        <NavLink to="/" exact>
          All users
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/places">My places</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">Add a place</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">Login / Sign-up</NavLink>
        </li>
      )}
      {auth.isLoggedIn && <Button onClick={auth.logout}>Logout</Button>}
    </ul>
  );
};

export default NavLinks;
