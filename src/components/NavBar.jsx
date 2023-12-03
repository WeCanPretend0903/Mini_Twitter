import React from "react";
import logo from "../img/logo2.png";

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
      </ul>
    </div>
  );
}

export default NavBar;
