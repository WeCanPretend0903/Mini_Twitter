import React from "react";
import Logo from '../Assets/logo.png';
import "./NavBar.css"

function NavBar() {
  return (
    <div className="navbar">
      <img className="logo" alt="logo" src={Logo}></img>
      <ul className="selection">
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/dashboard">Profile</a>
        </li>
        <li>
          <a href="/weather">Weather</a>
        </li>
        <li>
          <a href="/warning">Warning Messages</a>
        </li>
        <li>
          <a href="/search">Search</a>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
