import React from "react";
import "./SearchResultsList.css"

//this is the list of the search results, 
export const SearchResultList = ({ results }) => {
    return (
        <div className="resultsList">
            {
                results.map((result, id) => {
                    return <div key={id}>{result.name}</div>;
                })
            }
        </div>
    );
};