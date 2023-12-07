import React, { useEffect, useState } from 'react';
import PostBox from './PostBox';
import Post from './Post';
import './Home.css';
import dog from '../img/dog.jpeg';
import profile from '../img/profile.png';
import postData from '../Data/UserPost.json';
import userData from '../Data/UserData.json'

const HomePage = () => {
  // database for post
  const [posts, setPosts] = useState([]);
  const [trending, setTrending] = useState([]);
  // check if post is trending
  const isTrending = (post) => {
    if (post && post.postData) {
      return post.postData.likes > 10 && (post.postData.likes - post.postData.dislikes) > 3;
    }
    if (post.likes && post.dislikes) {
      return post.likes > 10 && (post.likes - post.dislikes) > 3;
    }
    return false;
  };  
  useEffect(() => {
    const fetchPosts = () => {
      const posts = postData.posts.map(post => {
        const user = userData.users.find(user => user.name === post.author);
        return {
          ...post,
          username: user ? user.name : 'Username',
          profilepic: user ? user.profilePicture : '',
        };
      });
      const regularPosts = posts.filter(post => !isTrending(post));
      const trendingPosts = posts.filter(post => isTrending(post));
      setPosts(regularPosts);
      setTrending(trendingPosts);
      };
      fetchPosts();
    }, []);
  // add new post to page
  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };
  // handle trending post
  const handleLikeChange = (postId) => {
    const post = posts.find(post => post.postId === postId);
    if (post && isTrending(post)) {
      const regularPosts = posts.filter(post => post.postId !== postId);
      setPosts(regularPosts);
      setTrending(prevTrending => [post, ...prevTrending]);
      return
    }
    const trendingPost = trending.find(post => post.postId === postId);
    if (trendingPost && !isTrending(trendingPost)) {
      const trendingPosts = trending.filter(post => post.postID !== postId);
      setTrending(trendingPost);
      setPosts(prevPost => [trendingPost, ...prevPost]);
      return
    }
  };
  return (
    <div className="home-page">
      <div className="posts-section">
        <PostBox onSubmit={addPost}/>
        <h2 id="section-heading">Your Posts</h2>
        <div className="posts">
        {posts.map((post) => (
            <Post
              key={post.postId}
              postId={post.postId}
              username={post.name || post.author || 'Username'}
              profilepic={post.profilePicture || profile}
              timestamp={post.time || post.timestamp}
              content={post.content}
              mediaFile={post.mediaFile ? post.mediaFile : ''}
              keywords={post.keywords}
              likes={post.likes}
              dislikes={post.dislikes}
              shares={post.shares}
              onSubmit={(postId) => handleLikeChange(postId)}
            />
          ))}
          <Post 
            username="Gold"
            profilepic={dog}
            timestamp="12/3/23 1:27PM"
            content="Happy doggy birthday!!!"
            keywords={['birthday', 'dog']}
            onSubmit={(postId) => handleLikeChange(postId)}
          />
          <Post 
            username="Steve"
            profilepic={profile}
            timestamp="12/3/23 1:30PM"
            content="Hello world!!!"
            onSubmit={(postId) => handleLikeChange(postId)}
          />
        </div>
      </div>
      <div className="trending-section">
        <h2 id="trending-heading">Trending Posts</h2>
        <div className="trending-posts">
          {trending.map((post) => (
            <Post
              key={post.postId}
              postId={post.postId}
              username={post.name || post.author || 'Username'}
              profilepic={post.profilePicture || profile}
              timestamp={post.time || post.timestamp}
              content={post.content}
              mediaFile={post.mediaFile ? post.mediaFile : ''}
              keywords={post.keywords}
              likes={post.likes}
              dislikes={post.dislikes}
              shares={post.shares}
              onSubmit={(postId, trending) => handleLikeChange(postId, trending)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;