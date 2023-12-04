import React from "react";
import logo from "../img/logo2.png";
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className="navbar">
      <img src={logo} alt="logo" className="logo"></img>
      <ul className="selection">
        <li>  
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/explore">Following</a>
        </li>
        <li>
          <a href="/friends">Explore</a>
        </li>
        <li>
          <a href="/notifications">Notifications</a>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
