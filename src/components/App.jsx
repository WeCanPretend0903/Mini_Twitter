import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './Home';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="home" element={<HomePage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
