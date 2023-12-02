import React, { useState } from 'react';
import Post from './Post';

const HomePage = () => {
  // database for post
  const [posts, setPosts] = useState([]);
  // add new post to page
  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };
  return (
    <div className="home-page">
      <div className="posts-section">
        <h2 id="section-heading">Posts</h2>
        {posts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
        <Post onSubmitCallback={addPost} />
      </div>
    </div>
  );
};
export default HomePage;