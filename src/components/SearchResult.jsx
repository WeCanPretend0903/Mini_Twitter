import React from "react";
import "./SearchResult.css";
import { Link } from 'react-router-dom';

//1.for the result list to look better under the search bar, see the css file
//2.for the user to  click on the result list items
export const SearchResult = ({ result }) => {
    const linkStyle = {
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'pointer',
    };
    return (
        //change this to the link to post or user
        <Link to="/home" style={linkStyle}>
        <div className="searchResult">
          {result}
        </div>
      </Link>
    );
};
