import React, { useState, useEffect } from 'react';
import './Post.css';
import CommentBox from './CommentBox';
import profanityData from '../Data/profanity-list.json'; // file obtained from https://github.com/dsojevic/profanity-list/tree/main

function Post ({
  username,
  profilepic,
  timestamp,
  content,
  mediaFile,
  keywords,
  postId,
  likes,
  dislikes,
  shares,
  onSubmit
}) {
  // post data
  const [postData, setPostData] = useState({
    likes: likes || 0,
    likeClicked: false,
    dislikes: dislikes || 0,
    dislikeClicked: false,
    shares: shares || 0,
    shareClicked: false,
    reportClicked: false,
    filteredContent: '',
    trending: false
  });
  const profanityList = profanityData.map(profanity => ({
    id: profanity.id,
    match: profanity.match,
  }));
  // handle filter content 
  const handleFilterContent = () => {
  const text = content;
  const words = text.split(/\s+/);
  const filtered = words.map(word => {
    const normalizedWord = word.toLowerCase().trim();
    const isProfanity = profanityList.some(profanity => {
      const regex = new RegExp(`\\b(${profanity.id}|${profanity.match.replace(/\|/g, '|')})\\b`, 'i');
      return regex.test(normalizedWord);
    });
    return isProfanity ? '*'.repeat(normalizedWord.length) : word;
  }).join(' ');
  setPostData(prevData => ({ ...prevData, filteredContent: filtered }));
  };
  // filter content
  useEffect(() => {
    handleFilterContent();
  }, [content]);
  // handle like button
  const handleLikeClick = () => {
    const likesCount = postData.likeClicked ? postData.likes - 1 : postData.likes + 1;
    const isTrending = likesCount > 10 && (likesCount - postData.dislikes) > 3;
    console.log(isTrending);
    setPostData((prevData) => ({
      ...prevData,
      likeClicked: !prevData.likeClicked,
      likes: likesCount,
      trending: isTrending,
    })); 
    onSubmit(postId, isTrending);
  };
   // handle dislike button
   const handleDislikeClick = () => {
    const dislikesCount = postData.dislikeClicked ? postData.dislikes - 1 : postData.dislikes + 1;
    const isTrending = postData.likes > 10 && (postData.likes - dislikesCount) > 3;
    console.log(isTrending);
    setPostData((prevData) => ({
      ...prevData,
      dislikeClicked: !prevData.dislikeClicked,
      dislikes: dislikesCount,
      trending: isTrending,
    }));
    onSubmit(postId, isTrending);
  };
   // handle share button
   const handleShareClick = () => {
    setPostData((prevData) => ({
      ...prevData,
      shareClicked: !prevData.shareClicked,
      shares: !prevData.shareClicked ? prevData.shares + 1 : prevData.shares - 1,
    }));
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
          <p>{postData.filteredContent}</p>
        </div>
        <div className="media-section">
          {mediaFile && (
            <div className="media-section">
            {mediaFile && (
              <div className="media-preview">
                {mediaFile.type && mediaFile.type.startsWith("video/") ? (
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
                    <img id="content-picture" src={URL.createObjectURL(mediaFile)} alt="Media" />
                  </div>
                )}
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
        <CommentBox postId={postId}/>
      </div>
  </div>
  )
};

export default Post;
