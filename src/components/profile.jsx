// Profile.jsx
import React, { useState } from 'react';
import { Avatar } from './Styles'; // Assuming Avatar component is in './Styles'
import Logo from '../Assets/logo.png';
import './profile.css';

const Profile = () => {
  // Dummy user data (replace with your actual user data)
  const userData = {
    username: 'JohnDoe',
    email: 'john.doe@example.com',
  };

  // State to manage user data
  const [user, setUser] = useState(userData);

  // Dummy logout function (replace with your actual logout logic)
  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logout clicked');
  };

  const home = () => {
    console.log('Home Page');
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav>
        <div className="navbar">
          <div className="logo">
            <Avatar image={Logo} />
          </div>
          <div className="logoutButtonContainer">
            <button className="logoutButton" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div className="homeButtonContainer">
            <button className="homeButton" onClick={home}>
              Home
            </button>
          </div>
        </div>
      </nav>

      {/* User Information Box */}
      <div className="profileBox">
        <div className="userImageContainer">
          <img
            className="userImage"
            src={Logo}  
            alt="User Profile"
          />
        </div>
        <div className='textContainer'>
          <strong>Username:</strong> {user.username}
        </div>
        <div>
          <strong>Email:</strong> {user.email}
        </div>
      </div>
    </div>
  );
};

export default Profile;
