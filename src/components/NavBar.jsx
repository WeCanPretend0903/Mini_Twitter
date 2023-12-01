import React from "react";
import logo from "../Assets/logo.png";
function NavBar() {
  return (
    <div className="navbar">
      <img src={logo} alt="logo" className="logo"></img>
      <ul className="selection">
        <li>
          <a href="/Main/home">Home</a>
        </li>
        <li>
          <a href="/Main/friends">Following</a>
        </li>
        <li>
          <a href="/Main/explore">Explore</a>
        </li>
        <li>
          <a href="/Main/notifications">Notifications</a>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;


