import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar = ({ setResults, data }) => {
    const [input, setInput] = useState("");
    const fetchData = (value) => {
      const results = data.user.filter((user) => {
        return (
          value &&
          user &&
          user.name &&
          user.email &&
          user.name.toLowerCase().includes(value)
        );
      });
      setResults(results);
    };
    
    const handleInputChange = (value) => {
        setInput(value);
        fetchData(value);
    };
    return (
        <div className="inputWrapper">
            <FaSearch id="searchIcon" />
            <input id="searchInput"placeholder="Search here..." 
            value={input}
            onChange={(e) => handleInputChange(e.target.value)} //store the typing inside input variable (存input)
            />
        </div>
    );
}
