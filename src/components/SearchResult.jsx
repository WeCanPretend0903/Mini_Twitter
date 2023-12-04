import React from "react";
import "./SearchResultsList.css"

//1.for the result list to look better under the search bar, see the css file
//2.for the user to  click on the result list items
export const SearchResult = ({ result }) => {
    return (
        <div className="searchResult"
            onClick={(e) => alert(`You cliked on ${result.name}`)} //change this to the link to post or user
        >
            {result.name}
        </div>
    );
};