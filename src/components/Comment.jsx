import React from 'react';
import './Comment.css';
import profilepic from '../img/profile.png';

function Comment({ comment }) {
  // Use the comment's username and profile picture
  const username = comment.username;
  const profilePicture = comment.profilePicture !== '' ? comment.profilePicture : profilepic;

  return (
    <div className="comment-container">
      <div className="comment-header">
        <img id="profile-picture" src={profilePicture} alt="Profile" />
        <h3 id="comment-name">{username}</h3>
        <h4 id="comment-time">{comment.time}</h4>
      </div>
      <div className="comment-content">
        <p id="content">{comment.content}</p>
      </div>
    </div>
  );
}

export default Comment;