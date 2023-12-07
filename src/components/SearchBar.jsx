import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar = ({ setResults, data }) => {
    const [input, setInput] = useState("");
    const fetchData = (value) => {
      const results = data.users.filter((users) => {
        return (
          value &&
          users &&
          users.name &&
          users.name.toLowerCase().includes(value)
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
/*Reference:
The search function is made based on the tutorial video:
"Make a Search Bar with React (with API Calls) | Beginners Tutorial" by Code Complete
from Youtube, link: https://www.youtube.com/watch?v=sWVgMcz8Q44 */
