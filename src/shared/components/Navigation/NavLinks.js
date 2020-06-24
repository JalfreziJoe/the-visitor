import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavLinks.module.css";

const NavLinks = props => {
  return (
    <ul className={classes["nav-links"]}>
      <li>
        <NavLink to="/" exact>
          All users
        </NavLink>
      </li>
      <li>
        <NavLink to="/u1/places">My places</NavLink>
      </li>
      <li>
        <NavLink to="/places/new">Add a place</NavLink>
      </li>
      <li>
        <NavLink to="/auth">Login / Sign-up</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
