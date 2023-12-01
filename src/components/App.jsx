import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from "./NavBar";
import Posts from "./Posts";
import Home from "./Home";
import Login from "./Login";
import Signup from "./SignUp";
import Dashboard from "./Dashboard";
import { StyledContainer } from "./Styles";


function App() {
  return (
    <Router>
      <StyledContainer>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Home />} />
            <Route path="/Main" element= {<div><NavBar/><Posts /></div>}/>
          </Routes>
      </StyledContainer>
    </Router>

  );
}

export default App;
