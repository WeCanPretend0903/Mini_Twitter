import React, { useState } from 'react';
import { StyledTitle, StyledSubTitle, Avatar, StyledButton, ButtonGroup, StyledFormArea } from "../components/Styles";
import { useNavigate } from 'react-router-dom';
import Logo from "../Assets/logo.png";
import profile from '../img/profile.png'
import { getAuth, signOut, updateProfile } from "firebase/auth";
import "./Dashboard.css";
//import userData from "../Data/UserData";

const Dashboard = () => {
  const history = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState("Your bio or Description Goes here");
  const [user, setUser] = useState({
    displayName: "Username",
    profilePic: profile,
  });

  const logout = async () => {
    const auth = getAuth();
    try {
      // Perform any additional logout logic specific to your application
      // Sign out the user using Firebase authentication
      await signOut(auth);
      // Redirect to Main home page
      history('/');
    } catch (error) {
      console.error('Logout error:', error.message);
      // Handle error as needed
    }
  };
  const handleEditClick = () => {
    setEditMode(true);
  };
  const handleSaveClick = async () => {
    const auth = getAuth();
    await updateProfile(auth.currentUser, {
      displayName: user.displayName,
      profilePic: user.profilePic,
    });
    setEditMode(false);
  };
  const handleMediaFile = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUser((prevUser) => ({
            ...prevUser,
            profilePic: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
  };  
  const openFile = () => {
    document.getElementById('fileInput').click();
  };
  return (
    <div>
      <div className="avatar">
        <Avatar image={Logo} />
      </div>
      <StyledFormArea className="form-area" bg="transparent">
        <StyledTitle className="title" size={65}>
          Welcome To SnapTweet
        </StyledTitle>
        <ButtonGroup className="button-group">
          <StyledButton onClick={logout} to="#">
            Logout
          </StyledButton>
        </ButtonGroup>
        <div className="profile-info">
          <div id="profile-pic">
            <Avatar image={user.profilePic} />
          </div>
          <div id="username">
            <StyledTitle>
                {user.displayName}
            </StyledTitle>
          </div>
          {editMode ? (
            <textarea
              id="description"
              className="edit-bio-textarea"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              cols={50}
            />
          ) : (
            <StyledSubTitle className="description" id="description">
              {bio}
            </StyledSubTitle>
          )}
          <ButtonGroup className="button-group">
            {editMode ? (
              <>
                <StyledButton onClick={handleSaveClick}>Save</StyledButton>
                <StyledButton onClick={openFile}>Upload Image</StyledButton>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleMediaFile}
                  style={{ display: "none" }}
                />
              </>
            ) : (
              <>
                <StyledButton onClick={handleEditClick}>Edit Profile</StyledButton>
              </>
            )}
          </ButtonGroup>
        </div>
      </StyledFormArea>
    </div>
  );
};

export default Dashboard;