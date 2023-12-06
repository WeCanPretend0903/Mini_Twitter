import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './Home';
import MainHome from './Mainhome';
import Login from './Login';
import Signup from './SignUp';
import Dashboard from './Dashboard';
import Weather from './Weather';
import Profile from './profile'
import { StyledContainer } from './Styles';
import { Search } from './Search';
function App() {
  // Define the signupUser function
  const signupUser = (user) => {
    // Implement your signupUser logic here
    console.log('User signed up:', user);
  };

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<StyledContainer><Signup signupUser={signupUser} /></StyledContainer>} />
        <Route path="/login" element={<StyledContainer><Login /></StyledContainer>} />
        <Route path="/dashboard" element={
        <div>
          <NavBar/>
          <StyledContainer><Dashboard /></StyledContainer>
        </div>} />
        <Route path="/" element={<StyledContainer><MainHome /></StyledContainer>} />
        <Route path="/search" element={<StyledContainer><Search /></StyledContainer>} />
        <Route path="/weather" element={
         <div>
         <NavBar/>
        <StyledContainer><Weather /></StyledContainer>
        </div>} />
        <Route path="/home" element={
          <div>
            <NavBar />
            <HomePage />
          </div>
        }
        />
      </Routes>
    </Router>
  );
}

export default App;





