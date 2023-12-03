import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './Home';
import MainHome from './Mainhome';
import Login from './Login';
import Signup from './SignUp';
import Dashboard from './Dashboard';
import { StyledContainer } from './Styles';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/signup" element={<StyledContainer><Signup /></StyledContainer>}/>
        <Route path="/login" element={<StyledContainer><Login /></StyledContainer>}/>
        <Route path="/dashboard" element={<StyledContainer><Dashboard /></StyledContainer>}/>
        <Route path="/Mainhome" element={<StyledContainer><MainHome /></StyledContainer>}/>
        <Route path="home" element={<HomePage />}
        />
      </Routes>
    </Router>
  );
}

export default App;


