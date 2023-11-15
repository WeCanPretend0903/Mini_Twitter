import React from "react";

function NavBar() {
  return (
    <div className="navbar">
      <ul>
        <li>
          <a href="/">Home</a>
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
