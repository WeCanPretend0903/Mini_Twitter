import React, {useState} from 'react';
import './Post.css';
import CommentBox from './CommentBox';

function Post ({
  username,
  profilepic,
  timestamp,
  content,
  mediaFile,
  keywords,
  postID,
}) {
  // post data
  const [postData, setPostData] = useState({
    likes: 0,
    likeClicked: false,
    dislikes: 0,
    dislikeClicked: false,
    shares: 0,
    shareClicked: false,
    reportClicked: false,
  });
  // handle like button
  const handleLikeClick = () => {
    setPostData((prevData) => ({
      ...prevData,
      likeClicked: !prevData.likeClicked,
      likes: !prevData.likeClicked ? prevData.likes + 1 : prevData.likes - 1,
    }));
  };
   // handle dislike button
   const handleDislikeClick = () => {
    setPostData((prevData) => ({
      ...prevData,
      dislikeClicked: !prevData.dislikeClicked,
      dislikes: !prevData.dislikeClicked ? prevData.dislikes + 1 : prevData.dislikes - 1,
    }));
  };
   // handle share button
   const handleShareClick = () => {
    setPostData((prevData) => ({
      ...prevData,
      shareClicked: !prevData.shareClicked,
      shares: !prevData.shareClicked ? prevData.shares + 1 : prevData.shares - 1,
    }));
    // recreate post with extra comment
  };
  // handle report button
  const handleReportClick = () => {
    setPostData((prevData) => ({
      ...prevData,
      reportClicked: !prevData.reportClicked,
    }));
    // add warning
  };
  return (
    <div className="post-container">
      <div className="post-header">
        <div className="profile-section">
          <div id="left-section">
            <div id="profile-picture">
              <img src = {profilepic} alt="Profile"/>
            </div>
            <div id="post-username">
              <h2>{username}</h2>
            </div>
          </div>
          <div id="right-section">
            <div id="time">
              <h4>{timestamp}</h4>
            </div>
          </div>
        </div>
        <div className="keywords">
          {keywords && (
            <div>
              {keywords.map((keyword, index) => (
                keyword.trim() !== '' && (
                  <span key={index} className="keyword">
                    {keyword}
                  </span>
                )
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="post-content">
        <div className="content-section">
          <p>{content}</p>
        </div>
        <div className="media-section">
          {mediaFile && (
            <div className="media-preview">
              {mediaFile.type.startsWith("video/") ? (
                <div>
                  <iframe
                    id="content-video"
                    title="Embedded Video"
                    src={URL.createObjectURL(mediaFile)}
                    type={mediaFile.type}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div>
                  <img id="content-picture" src={URL.createObjectURL(mediaFile)}alt="Media" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="post-badges">
        <div className="like">
          <button
            id="like-button"
            className={postData.likeClicked ? "clicked" : ""}
            onClick={handleLikeClick}
          >
            Like : {postData.likes}
          </button>
        </div>
        <div className="dislike">
          <button
            id="dislike-button"
            className={postData.dislikeClicked ? "clicked" : ""}
            onClick={handleDislikeClick}
          >
            Dislike : {postData.dislikes}
          </button>
        </div> 
        <div className="share">
          <button
            id="share-button"
            className={postData.shareClicked ? "clicked" : ""}
            onClick={handleShareClick}
          >
            Share : {postData.shares}
          </button>
        </div>
        <div className="report">
          <button
            id="report-button"
            className={postData.reportClicked ? "clicked" : ""}
            onClick={handleReportClick}
          >
            Report
          </button>
        </div>
      </div>
      <div className="post-comments">
        <CommentBox postID={postID}/>
      </div>
  </div>
  )
};

export default Post;
