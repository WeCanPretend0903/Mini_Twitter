import React, { useState, useEffect } from "react";
import {
  StyledTitle,
  StyledSubTitle,
  Avatar,
  StyledButton,
  ButtonGroup,
  StyledFormArea,
} from "../components/Styles";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Logo from "../Assets/logo.png";
import profile from "../img/profile.png";
import userData from "../Data/UserData.json";
import "./Dashboard.css";
import { getBalance, setBalance } from "./localStorage";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
const Dashboard = ({ location }) => {
  const history = useNavigate();

  // Unconditionally call useState for editMode, bio, dashboardUser, amount
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState("Your bio or Description Goes here");
  const [dashboardUser, setDashboardUser] = useState({
    displayName: "Username",
    profilePic: profile,
    id: 0,
  });
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = Number(localStorage.getItem("userId")); // Convert to number

    if (!storedUser || !userId) {
      console.error("User or userId is undefined");
      history("/");
      return;
    }

    const user = userData.users.find((user) => user.id === userId);
    if (user) {
      const storedBalance = getBalance(user.id);
      setAmount(storedBalance);
      setDashboardUser({
        displayName: user.name,
        profilePic: user.profilePicture ? user.profilePicture : profile,
        id: user.id,
      });
      setBio(user.userBio);
    } else {
      // Handle case where user is not found
      console.error("User not found");
      history("/");
    }
  }, [history]);

  const generateCurrency = () => {
    if (dashboardUser) {
      const newBalance = getBalance(dashboardUser.id) + 1;
      setAmount(newBalance);
      setBalance(dashboardUser.id, newBalance);
    }
  };

  const logout = () => {
    // Remove the user and userId from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("userId");

    // Use the history object to navigate to the '/' route
    history.push("/");
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    const auth = getAuth();
    await updateProfile(auth.currentUser, {
      displayName: dashboardUser.displayName,
      profilePic: dashboardUser.profilePic,
    });
    setEditMode(false);
  };

  const handleMediaFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDashboardUser((prevUser) => ({
          ...prevUser,
          profilePic: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const openFile = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="dashboard">
      <div className="heading">
        <StyledFormArea className="form-area" bg="transparent">
          <StyledTitle className="title" size={65}>
            Welcome To SnapTweet
          </StyledTitle>
          <ButtonGroup className="button-group">
            <StyledButton onClick={logout}>Logout</StyledButton>
          </ButtonGroup>
        </StyledFormArea>
      </div>
      <div className="user-info">
        <div className="profile-info">
          <div id="profile-pic">
            <Avatar image={dashboardUser.profilePic} />
          </div>
          <div id="username">
            <StyledTitle>{dashboardUser.displayName}</StyledTitle>
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
                <StyledButton onClick={handleEditClick}>
                  Edit Profile
                </StyledButton>
              </>
            )}
          </ButtonGroup>
        </div>
        <div className="balance-info">
          <h3 id="balance">Your Balance: ${amount.toFixed(2)}</h3>
          <StyledButton id="deposit-button" onClick={generateCurrency}>
            Generate Currency
          </StyledButton>
        </div>
        <div className="warning-Messages">
          <h3>Warning Messages</h3>
          {/* Scrollable container for warning messages */}
          <div className="warning-Messages-Container">
            <p>
              <a href="/warning/1">Warning Message</a>
            </p>
            <p>
              <a href="/warning/1">Payment Due</a>
            </p>
            <p>
              <a href="/warning/1">Due day</a>
            </p>
            <p>
              <a href="/warning/1">Warning Message</a>
            </p>
            <p>
              <a href="/warning/1">Warning Message</a>
            </p>
            <p>
              <a href="/warning/1">Warning Message</a>
            </p>
            <p>
              <a href="/warning/1">Warning Message</a>
            </p>
            <p>
              <a href="/warning/1">Warning Message</a>
            </p>
            {/* ... more warning messages */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
