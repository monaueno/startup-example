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
          {/* Define routes for each page */}
          <Route path="/" element={<Login />} />
          <Route path="/clockin" element={<ClockIn />} />
          <Route path="/mypay" element={<MyPay />} />
          <Route path="/profile" element={<Profile />} />
          {/* Add a fallback for unmatched routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

// NotFound Component for unmatched routes
function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
    </div>
  );
}

export default App;
