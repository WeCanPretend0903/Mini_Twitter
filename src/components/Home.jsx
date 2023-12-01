import React, { useState } from 'react';
import Post from './Post';

const HomePage = () => {
  // database for post
  const [posts, setPosts] = useState([]);
  // add new post to page
  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };
  return (
    <div className="home-page">
      <div className="posts-section">
        <Post onSubmit={addPost} />
        {posts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </div>
      {/*
      <div className="trending-section">
        <h2>Trending Posts</h2>
          {getTrendingPosts().map((trendingPost, index) => (
            <Post key={index} {...trendingPost} />
        ))}
      </div>
          */}
    </div>
  );
};
export default HomePage;