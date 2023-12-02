import React, {useState} from 'react';
import profile from '../img/profile.png'
import './Post.css';

const Post = ({ onSubmitCallback }) => {
  // User data
  const user = {
    username: "Kevin Zheng",
    profilepic: profile,
  };
  const [keywords, setKeywords] = useState(['', '', '']);
  const [content, setContent] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [likes, setLike] = useState(0);
  const [likeClicked, setLiked] = useState(false);
  const [dislikes, setDislike] = useState(0);
  const [dislikeClicked, setDisliked] = useState(false);
  const [shares, setShares] = useState(0);
  const [shareClicked, setShared] = useState(false);
  const [reportClicked, setReported] = useState(false);
  const [postState, setPostState] = useState("editing");
  // Handle keywords
  const handleKeywords = (index, event) => {
    const newWords = [...keywords];
    newWords[index] = event.target.value;
    setKeywords(newWords);
  };
  // Handle Content
  const handleContent = (event) => {
    setContent(event.target.value);
  };
  // Handle media file
  const handleMediaFile = (event) => {
    const file = event.target.files[0];
    if (isSupportedFileType(file)) {
      setMediaFile(file);
      setErrorMessage('');
    } else {
      setMediaFile(null);
      setErrorMessage("Invalid media type.");
    }
  };
  // check media file type
  const isSupportedFileType = (file) => {
    const imageTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    const videoTypes = ["video/mp4", "video/webm", "video/ogg", "video/MOV"];
    return imageTypes.includes(file.type) || videoTypes.includes(file.type);
  };
  // open file folder
  const openFile = () => {
    document.getElementById("fileInput").click();
  };
  // remove file from message
  const removeFile = () => {
    setMediaFile(null);
  }
  // get time
  const getTime = () => {
    const date = new Date();
    const dateOption = { month: 'numeric', day: 'numeric', year: 'numeric' };
    const timeOption = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = date.toLocaleDateString('en-US', dateOption);
    const formattedTime = date.toLocaleTimeString('en-US', timeOption);
    return `${formattedDate} ${formattedTime}`;
  }
  // post message
  const postMessage = () => {
    setPostState("posted");
    const postData = {
      user,
      keywords,
      content,
      mediaFile,
      likes,
      dislikes,
      shares,
    }
    onSubmitCallback(postData);
  };
  // handle like button
  const handleLikeClick = () => {
    setLiked((prev) => !prev);
    setLike((prevCount) => (likeClicked ? prevCount - 1 : prevCount + 1))
  };
   // handle dislike button
   const handleDislikeClick = () => {
    setDisliked((prev) => !prev);
    setDislike((prevCount) => (dislikeClicked ? prevCount - 1 : prevCount + 1))
  };
   // handle share button
   const handleShareClick = () => {
    setShared((prev) => !prev);
    setShares((prevCount) => (shareClicked ? prevCount - 1 : prevCount + 1))
    // recreate post with extra comment
  };
  // handle report button
  const handleReportClick = () => {
    setReported((prev) => !prev);
    // add warning
  };
  return (
    <div className="post-container">
      <div className="post-header">
        <div className="profile-section">
          <div id="left-section">
            <div id="profile-picture">
              <img src = {user.profilepic} alt="Profile"/>
            </div>
            <div id="post-username">
              <h2>{user.username}</h2>
            </div>
          </div>
          <div id="right-section">
            <div id="time">
              <h4>{getTime()}</h4>
            </div>
            <div>
              {postState === "editing" && (
                <button id="post-button" onClick={postMessage}>Post Message</button>
              )}
            </div>
          </div>
        </div>
        <div className="keywords">
          <div>
            {[0, 1, 2].map((index) => (
              <input
                key={index}
                type="text"
                placeholder={`Keyword ${index + 1}`}
                value={keywords[index]}
                onChange={(event) => handleKeywords(index, event)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="post-content">
       <div className="content-section">
          <textarea
            placeholder="Share your thoughts"
            value={content}
            onChange={handleContent}
          />
       </div>
       <div className="media-section">
          {postState === "editing" && (
            <>
            <button id="add-button" onClick={openFile}>Upload Image/Video</button>
          <input
            id="fileInput"
            type="file"
            accept="image/*, video/*"
            onChange={handleMediaFile}
            style={{ display: "none" }}
          />
          </>
        )}
          {postState === "editing" && errorMessage && (
            <p id="error-message">{errorMessage}</p>
          )}
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
                  <img id="content-picture" src={URL.createObjectURL(mediaFile)} alt="Media"/>
                </div>
              )}
            </div>
          )}
          {postState === "editing" && (
            <button id="remove-button" onClick={removeFile}>Remove Uploaded File</button>
          )}
       </div>
      </div>
      <div className="post-statistics">
        {postState === "posted" && (
          <>
            <div className="like">
            <button
              id="like-button"
              className={likeClicked ? "clicked" : ""}
              onClick={handleLikeClick}
            >
              Like : {likes}
            </button>
            </div>
            <div className="dislike">
            <button
              id="dislike-button"
              className={dislikeClicked ? "clicked" : ""}
              onClick={handleDislikeClick}
            >
              Disike : {dislikes}
            </button>
            </div>
            <div className="share">
              <button
                id="share-button"
                className={shareClicked ? "clicked" : ""}
                onClick={handleShareClick}
              >
                Share : {shares}
              </button>
            </div>
            <div className="report">
              <button
                id="report-button"
                className={reportClicked ? "clicked" : ""}
                onClick={handleReportClick}
              >
                Report
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
