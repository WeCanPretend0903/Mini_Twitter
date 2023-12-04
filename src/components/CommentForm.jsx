import React, { useState } from 'react';
import "./CommentForm.css"

function CommentForm ({ addComment }) {
  // comment text
  const [commentText, setCommentText] = useState('');
  // handle comment submit
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (commentText.trim() === '') {
        return;
    }
    addComment(commentText);
    setCommentText('');
  }
  return (
    <div className="comment-form">
      <form onSubmit={handleCommentSubmit}>
        <textarea
          rows="3"
          placeholder="Comment here"
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
        />
        <button type="sumbit-button">Comment</button>
      </form>
    </div>
  );
};
export default CommentForm;