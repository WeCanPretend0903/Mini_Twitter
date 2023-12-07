import React, { useState } from "react";
import "./Warning_Message.css"; // Make sure to import your CSS
import Data from "../Data/UserData.json";

const Checklist = () => {
  const [Warnings] = useState([]);
  const [items, setItems] = useState([
    {
      id: 1,
      text: "Bad Language Warning",
      checked: false,
      details: "Details about Item 2",
      showDetails: false,
    },
    {
      id: 2,
      text: "Fake information",
      checked: false,
      details: "Details about Item 2",
      showDetails: false,
    },
    {
      id: 3,
      text: "Post advertisement",
      checked: false,
      details: "Details about Item 2",
      showDetails: false,
    },
    // Add more items as needed
  ]);

  const toggleCheck = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

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
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => toggleCheck(item.id)}
          />
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
