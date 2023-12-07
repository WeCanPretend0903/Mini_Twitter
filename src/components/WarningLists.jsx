import React, { useState } from "react";
import "./Warning_Message.css";
import UserData from "../Data/UserData.json";

const Checklist = (props) => {
  const userWarnings =
    UserData.users.find((user) => user.id === 1)?.Warning_Messages || [];

  const [items, setItems] = useState(
    userWarnings.map((warning, index) => ({
      id: index + 1,
      text: warning.Message,
      details: warning.detail,
      showDetails: false,
    }))
  );

  const toggleDetails = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, showDetails: !item.showDetails } : item
      )
    );
  };

  return (
    <div className="checklist">
      {items.map((item) => (
        <div key={item.id} className="checklist-item">
          <label onClick={() => toggleDetails(item.id)}>{item.text}</label>
          {item.showDetails && (
            <div className="item-details">{item.details}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Checklist;
