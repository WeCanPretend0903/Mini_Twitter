import React, { useEffect, useState } from 'react';
import {FaSearch} from "react-icons/fa"
import "./SearchBar.css"

export const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState("") 
    const fetchData = (value) => {
        //we can put some kind of database for search, like username, posts, in json file
        //I put some place holder for now
        const data = ['user', 'user', 'post', 'post', 'content'];//fake data
        //const results = data.filter(item => item.toLowerCase().includes(value.toLowerCase()));
        const results = data;
        setResults(results);
    }
    const handleInputChange = (value) => {
        setInput(value);
        fetchData(value);
    }
    return (
        <div className="inputWrapper">
            <FaSearch id="searchIcon" />
            <input id="search-input"placeholder="Search here..." 
            value={input}
            onChange={(e) => handleInputChange(e.target.value)} //store the typing inside input variable (存input)
            />
        </div>
    );
}