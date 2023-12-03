import React, { useEffect, useState } from 'react';
import PostBox from './PostBox';
import Post from './Post';
import './Home.css';

const HomePage = () => {
  // database for post
  const [posts, setPosts] = useState([]);
  // add new post to page
  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };
  return (
    <div className="home-page">
      <div className="posts-section">
        <PostBox onSubmit={addPost}/>
        <h2 id="section-heading">Posts</h2>
        <div className="posts">
          {posts.map((post, index) => (
            <Post
              key={index}
              username={post.user.username}
              profilepic={post.user.profilepic}
              timestamp={post.time}
              content={post.content}
              mediaFile={post.mediaFile}
              keywords={post.keywords}
            />
          ))}
        </div>
      </div>
      <div className="trending-section">
      <Post 
        username="kevin Zheng"
        content="trending"
      />
      </div>
    </div>
  );
};
export default HomePage;