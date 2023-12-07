import React, { useState } from "react";
import Warning from "./WarningLists";
import "./Warning_Message.css";

const WarningWrapper = () => {
  return (
    <div className="Wrapper">
      <Warning />
    </div>
  );
};

export default WarningWrapper;
