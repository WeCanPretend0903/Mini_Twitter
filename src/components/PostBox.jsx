import React, { useState, useEffect } from 'react';
import "./PostBox.css";
import profile from '../img/profile.png'
import profanityData from '../Data/profanity-list.json'; // file obtained from https://github.com/dsojevic/profanity-list/tree/main

function PostBox ({ onSubmit }) {
  // post data
  const [data, setData] = useState({
    user: {
      username: "Kevin Zheng",
      profilepic: profile,
      userType: "Ordinary",
    },
    keywords: ['', '', ''],
    content: '',
    mediaFile: null,
    errorMessage: '',
    time: 0,
  });
  const profanityList = profanityData.map(profanity => ({
    id: profanity.id,
    match: profanity.match,
  }));
  // handle keywords
  const handleKeywords = (index, event) => {
    const newWords = [...data.keywords];
    newWords[index] = event.target.value;
    setData({ ...data, keywords: newWords});
  };
  // handle Content
  const handleContent = (event) => {
    setData({...data, content: event.target.value});
  };
  // handle media file
  const handleMediaFile = (event) => {
    const file = event.target.files[0];
    if (isSupportedFileType(file)) {
      setData({...data, mediaFile: file, errorMessage: ''});
    } else {
      setData({...data, mediaFile: null, errorMessage: "Invalid media type."});
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
      setData({...data, mediaFile: null});
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
  // count bad words
  const countBadWords = () => {
    const text = data.content;
    const words = text.split(/\s+/);
    let tabooWordsCount = 0;
    words.forEach(word => {
      const normalizedWord = word.toLowerCase().trim();
      const isProfanity = profanityList.some(profanity => {
        const regex = new RegExp(`\\b(${profanity.id}|${profanity.match.replace(/\|/g, '|')})\\b`, 'i');
        return regex.test(normalizedWord);
      });
      if (isProfanity) {
        tabooWordsCount += 1;
      }
    });
    return tabooWordsCount;
  };
  // count total words
  const countWords = () => {
    let words = data.content.split(/\s+/).filter(word => word.trim() !== ''); 
    if (data.mediaFile) {
      if (data.mediaFile.type.startsWith('image/')) {
        words += 10;
      } else {
        words += 15;
      }
    }
    return words;
  };
  //
  const chargeUser = () => {
    return;
  };
  // post message
  const postMessage = () => {
    let badWordCount = countBadWords();
    if (badWordCount > 2) {
      setData((prevData) => ({ ...prevData, errorMessage: "Bad langauge, sending a warning."}));
      return;
    }
    else {
      const wordCount = countWords();
      if (data.user.userType == "Ordinary") {
        if (wordCount > 20) {
          chargeUser((0.1 * (wordCount - 20)))
        }
      } else if (data.user.userType === "Corporte") {
        chargeUser(wordCount);
      }
      const postData = {
        user: data.user,
        keywords: data.keywords,
        content: data.content,
        mediaFile: data.mediaFile,
        time: getTime()
      }
      onSubmit(postData);
      setData({
        user: {
          username: "Kevin Zheng",
          profilepic: profile
        },
        keywords: ['', '', ''],
        content: '',
        mediaFile: null,
        errorMessage: '',
        time: 0,
      });
    }
  };
  return (
    <div className="post-container">
      <div className="post-header">
        <div className="profile-section">
          <div id="left-section">
            <div id="profile-picture">
              <img id="profile-picture" src = {data.user.profilepic} alt="Profile"/>
            </div>
            <div id="post-username">
              <h2>{data.user.username}</h2>
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
                value={data.keywords[index]}
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
              value={data.content}
              onChange={handleContent}
            />
        </div>
        <div className="media-section">
          <button id="add-button" onClick={openFile}>Upload Image/Video</button>
            <input
              id="fileInput"
              type="file"
              accept="image/*, video/*"
              onChange={handleMediaFile}
              style={{ display: "none" }}
            />
          {data.errorMessage && (
            <p id="error-message">{data.errorMessage}</p>
          )}
          {data.mediaFile && (
            <div className="media-preview">
              {data.mediaFile.type.startsWith("video/") ? (
                <div>
                  <iframe
                    id="content-video"
                    title="Embedded Video"
                    src={URL.createObjectURL(data.mediaFile)}
                    type={data.mediaFile.type}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div>
                  <img id="content-picture" src={URL.createObjectURL(data.mediaFile)} alt="Media"/>
                </div>
              )}
            </div>
          )}
          <button id="remove-button" onClick={removeFile}>Remove Uploaded File</button>
        </div>
      </div>
    </div>
  )
}

export default PostBox;