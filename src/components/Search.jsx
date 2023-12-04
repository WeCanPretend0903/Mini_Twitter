import React, { useEffect, useState } from 'react';
import "./Search.css"
import { SearchBar } from './SearchBar';
import { SearchResultList } from './SearchResultsList';

//The search page, you get to here by cliking the button on the nav bar
//includes a search bar and the list of results
export function Search () {
    const [results, setResults] = useState([]);
    return (
        <div className="Search">
            <div className="searchBarContainer">
                <SearchBar setResults={setResults}/>
                <SearchResultList results={results} />
            </div>
        </div>
    )
}