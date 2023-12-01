import React, {useState} from "react";
import profile from '../img/profile.png'
import './Post.css';

const Post = ({ onSubmit }) => {
  const user = {
    username: "Kevin Zheng",
    profilepic: profile,
  };
  // User inputs
  const [keywords, setKeywords] = useState(['', '', '']);
  const [content, setContent] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
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
    const newPost = {
      // User data
        user,
        keywords,
        content,
        mediaFile,
        errorMessage
    };
    onSubmit(newPost)
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
              <button id="post-button" onClick={postMessage}>Post Message</button>
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
            placeHolder="Write your content here"
            value={content}
            onChange={handleContent}
          />
       </div>
       <div className="media-section">
          <button id="media-button" onClick={openFile}>Upload Image/Video</button>
          <input
            id="fileInput"
            type="file"
            accept="image/*, video/*"
            onChange={handleMediaFile}
            style={{ display: "none" }}
          />
          {errorMessage && <p id="error-message">{errorMessage}</p>}
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
          <button id="media-button" onClick={removeFile}>Remove Uploaded File</button>
       </div>
      </div>
    </div>
  );
};

export default Post;
