import React, { useEffect, useState } from 'react';
import PostBox from './PostBox';
import Post from './Post';
import './ResultPage.css';
import profile from '../img/profile.png';
import { SearchBar } from './SearchBar';
import { SearchResultsList } from './SearchResultsList';
import UserData from "../Data/UserData.json"
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import logo from '../Assets/logo.png';
import { useLocation } from 'react-router-dom';

export function ResultPage () {
    const [results, setResults] = useState([]);
    const [posts, setPosts] = useState([]);
    //const location = useLocation();
    //const results1 = location.state.results || [];
    // add new post to page
    return (
        <div className="ResultPage">
            <div className="searchHeading">
                <div className="logoContainer1">
                    <img src={logo} alt="Logo" className="logo1" />
                </div>
                <div className="searchBarContainer1">
                    <SearchBar setResults={setResults} data={UserData} className="SearchBar1" />
                    {results && results.length > 0 && <SearchResultsList results={results} />}
                </div>
            </div>
            <div>
                <h2>No results</h2>
            </div>
            <div className="posts">
                {posts.map((post, index) => (
                    <Post
                    key={index}
                    postID={uuidv4()}
                    username={post.user.username}
                    profilepic={post.user.profilepic}
                    timestamp={post.time}
                    content={post.content}
                    mediaFile={post.mediaFile}
                    keywords={post.keywords}
                    />
                ))}
            </div>
            {/*
            <div>
                <h2>Search Results</h2>
                <ul>
                    {results.map((result) => (
                        <li key={result.id}>{result.name}</li>
                    ))}
                </ul>
            </div>
                    */}
        </div>
      );
};