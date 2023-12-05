import React, { useState, useEffect } from 'react';
import "./PostBox.css";
import profile from '../img/profile.png'
import profanityData from '../Data/profanity-list.json'; // file obtained from https://github.com/dsojevic/profanity-list/tree/main
import userData from "../Data/UserData.json";
import { getBalance, setBalance } from './localStorage';

function PostBox ({ onSubmit }) {
  // post data
  const userId = 1;
  const userInfo = userData.users.find((user) => user.id === userId);
  const [data, setData] = useState({
    user: {
      username: "Username",
      profilepic: profile,
      userType: "OU",
    },
    keywords: ['', '', ''],
    content: '',
    mediaFile: null,
    errorMessage: '',
    time: 0,
  });  
  useEffect(() => {
    const userInfo = userData.users.find((user) => user.id === userId);
    if (userInfo) {
      setData(prevData => ({
        ...prevData,
        user: {
          username: userInfo.name,
          profilepic: userInfo.profilePicture !== "" ? userInfo.profilePicture : profile,
          userType: userInfo.userType,
        },
      }));
    }
  }, []);  
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
    const words = data.content.split(/\s+/);
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
    let length = words.length
    if (data.mediaFile) {
      if (data.mediaFile.type.startsWith('image/')) {
        length += 10;
      } else {
        length += 15;
      }
    }
    return length;
  };
  // charge user for posting
  const chargeUser = (amount) => {
    const currentBalance = getBalance(userInfo.id);
    if (currentBalance >= amount) {
      setBalance(userInfo.id, currentBalance - amount)
    } else {
      // send warning
      setData({errorMessage: "Not sufficent funds. Head to dashboard to deposit money."});
    }
  };
  // post message
  const postMessage = () => {
    let badWordCount = countBadWords();
    if (badWordCount > 2) {
      setData((prevData) => ({ ...prevData, errorMessage: "Bad langauge, sending a warning."}));
      return;
    } else {
      const wordCount = countWords();
      let chargeAmount = 0;
      if (data.user.userType === "OU") {
        if (wordCount > 20) {
          chargeAmount = 0.1 * (wordCount - 20);
        }
      } else if (data.user.userType === "CU") {
        chargeAmount = wordCount;
      }
      chargeUser(chargeAmount);
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
          username: userData ? userInfo.name : "Username",
          profilepic: userInfo && userInfo.profilePicture !== "" ? userInfo.profilePicture : profile,
          userType: userData ? userInfo.userType : "Surfer",
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