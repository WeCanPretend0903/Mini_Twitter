import React, { useEffect, useState } from 'react';
import PostBox from './PostBox';
import Post from './Post';
import './Home.css';
import dog from '../img/dog.jpeg';
import profile from '../img/profile.png';
import { v4 as uuidv4 } from 'uuid';

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
        <h2 id="section-heading">Your Posts</h2>
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
      </div>
      <div className="trending-section">
        <h2 id="trending-heading">Trending Posts</h2>
        <div className="trending-posts">
          <Post 
            username="Gold"
            profilepic={dog}
            timestamp="12/3/23 1:27PM"
            content="Happy doggy birthday!!!"
            keywords={['birthday', 'dog']}
          />
          <Post 
            username="Steve"
            profilepic={profile}
            timestamp="12/3/23 1:30PM"
            content="Hello world!!!"
          />
        </div>
      </div>
    </div>
  );
};
export default HomePage;