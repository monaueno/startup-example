// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import ClockIn from './pages/clockin';
import MyPay from './pages/mypay';
import Profile from './pages/profile';
import './App.css'; // Import global styles

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/clockin" element={<ClockIn />} />
          <Route path="/mypay" element={<MyPay />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
