import React, { useState, useEffect } from 'react';
import { StyledTitle, StyledSubTitle, Avatar, StyledButton, ButtonGroup, StyledFormArea } from "../components/Styles";
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import Logo from "../Assets/logo.png";
import profile from '../img/profile.png';

const Dashboard = () => {
  const history = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState("Your bio or Description Goes here");
  const [user, setUser] = useState({
    displayName: "Username",
    email: "",
    profilePic: profile,
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const emailParts = authUser.email.split('@');
        const username = emailParts.length > 0 ? emailParts[0] : "Username";
        
        setUser({
          displayName: username,
          email: authUser.email || "",
          profilePic: authUser.photoURL || profile,
        });
      } else {
        // Handle the case where the user is not signed in
        history('/');
      }
    });
  
    return () => {
      // Unsubscribe from the listener when the component is unmounted
      unsubscribe();
    };
  }, [history]);

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
            <StyledTitle>{user.displayName}</StyledTitle>
          </div>
          <div id="email">
            <StyledSubTitle>{user.email}</StyledSubTitle>
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
