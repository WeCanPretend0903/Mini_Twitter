import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';
import './CommentBox.css';

function CommentBox ({ postID }) {
  // comment data
  const [comments, setComments] = useState([]);
  // get time
  const getTime = () => {
    const date = new Date();
    const dateOption = { month: 'numeric', day: 'numeric', year: 'numeric' };
    const timeOption = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = date.toLocaleDateString('en-US', dateOption);
    const formattedTime = date.toLocaleTimeString('en-US', timeOption);
    return `${formattedDate} ${formattedTime}`;
  }
  // add comments
  const addComment = (commentText) => {
    const newComment = {
      postID,
      username: "Username",
      content: commentText,
      time: getTime(),
    };
    setComments((prevComments) => [newComment, ...prevComments]);
  };
  return (
    <div className="comment-box">
      <h2 id="comment-heading">Comments</h2>
      <CommentForm addComment={addComment} />
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );
};

export default CommentBox;