import React, { useState, useEffect } from 'react';
import { StyledTitle, StyledSubTitle, Avatar, StyledButton, ButtonGroup, StyledFormArea } from "../components/Styles";
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import Logo from "../Assets/logo.png";
import profile from '../img/profile.png';
import userData from '../Data/UserData.json';
import './Dashboard.css';

const Dashboard = () => {
  const history = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState("Your bio or Description Goes here");
  const [user, setUser] = useState({
    username: "Username",
    profilePic: profile,
  });
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const user = userData.users.find((user) => user.id === 2);
    if (user) {
      setBalance(user.balance);
      setUser({
        displayName: user.name,
        profilePic: user.profilePicture ? user.profilePicture : profile,
      });
      setBio(user.userBio);
    }
  }, []);
  const generateCurrency = () => {
    setBalance(prevBalance => prevBalance + 1);
  };
  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      history('/');
    } catch (error) {
      console.error('Logout error:', error.message);
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
    <div className="dashboard">
      <div className="heading">
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
          </StyledFormArea>
      </div>
      <div className="user-info">
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
        <div className="balance-info">
          <h3 id="balance">Your Balance: ${balance.toFixed(2)}</h3>
          <StyledButton id="deposit-button" onClick={generateCurrency}>Generate Currency</StyledButton>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
