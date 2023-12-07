import React, { useState } from "react";
import Warning from "./WarningLists";
import "./Warning_Message.css";
import NavBar from "./NavBar";

const WarningWrapper = () => {
  const [todos, setTodos] = useState([]);
  return (
    <div className="Wrapper">
      <h2 className="warning-message-header">Warning Messages</h2>
      <Warning />
    </div>
  );
};

export default WarningWrapper;
