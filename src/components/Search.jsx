import React, { useEffect, useState } from 'react';
import "./Search.css";
import { SearchBar } from './SearchBar';
import { SearchResultsList } from './SearchResultsList';
import UserData from "./UserData.json"
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
//The search page, you get to here by cliking the button on the nav bar
//includes a search bar and the list of results
export function Search () {
    const [results, setResults] = useState([]);
    return (
        <div className="Search">
          <div className="searchBarContainer">
            <SearchBar setResults={setResults} data={UserData}/>
            {results && results.length > 0 && <SearchResultsList results={results} />}
          </div>
        </div>
    );
}
