import React from "react";
import "./SearchResultsList.css"
import { SearchResult } from "./SearchResult";

//this is the list of the search results, 
export const SearchResultsList = ({ results }) => {
    return (
        <div className="resultsList">
          {results.map((result, id) => {
            return <SearchResult result={result.name} key={id} />;
          })}
        </div>
    );
};
