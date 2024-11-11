// src/pages/Profile.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <h1>TodayPay!</h1>
        <nav>
          <ul>
            <li><Link to="/">Log In</Link></li>
            <li><Link to="/clockin">Clock In</Link></li>
            <li><Link to="/mypay">My Pay</Link></li>
            <li><Link to="/profile" className="active">Profile</Link></li>
          </ul>
        </nav>
        <button className="logout-button" onClick={() => navigate('/')}>Log Out</button>
      </header>

      <main>
        <h1>Welcome, Your Name!</h1>
        <div className="profile-container">
          <div className="picture-box">
            <img
              width="100px"
              src="https://github.com/user-attachments/assets/396112a4-4cf7-4215-a2e9-86534faa81e6"
              alt="Profile Picture"
            />
          </div>
          <div className="button-container">
            <button className="action-button">Settings</button>
            <button className="action-button">Preferences</button>
            <button className="action-button">Compensation</button>
            <button className="action-button">Benefits</button>
            <button className="action-button">Contact</button>
          </div>
        </div>
      </main>

      <footer>
        <hr />
        <span className="text-reset">Mona Ueno</span><br />
        <a href="https://github.com/monaueno/startup-example/blob/main/README.md">Github</a>
      </footer>
    </div>
  );
}

export default Profile;
