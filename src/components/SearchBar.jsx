import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import { useNavigate } from 'react-router-dom';

export const SearchBar = ({setResults, data }) => {
    const [input, setInput] = useState("");
    //const [results, setResults1] = useState([]);
    //const navigate = useNavigate();

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
/*
    const navigateToResultsPage = () => {
      // You can use the useHistory hook to navigate to another page
      navigate('/result', { state: { results } });
    };
*/
    return (
        <div className="inputWrapper">
            <FaSearch id="searchIcon" />
            <input id="searchInput"placeholder="Search or Type an User name" 
            value={input}
            onChange={(e) => handleInputChange(e.target.value)} //store the typing inside input variable
            />
            {/*<button onClick={navigateToResultsPage}>Go to Results</button>*/}
        </div>
    );
}
/*Reference:
The search function is made based on tutorial video:
"Make a Search Bar with React (with API Calls) | Beginners Tutorial" by Code Complete
from Youtube, link: https://www.youtube.com/watch?v=sWVgMcz8Q44 */
