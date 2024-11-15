// src/pages/Profile.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();

  const userName = "John Doe"; // Replace with dynamic data as needed

  return (
    <div>
      {/* Header */}
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

      {/* Main Content */}
      <main>
        <h1>Welcome, {userName}!</h1>
        <div className="profile-container">
          {/* Profile Picture */}
          <div className="picture-box">
            <img
              width="120px"
              src="https://github.com/user-attachments/assets/396112a4-4cf7-4215-a2e9-86534faa81e6"
              alt={`${userName}'s Profile`}
            />
          </div>

          {/* Action Buttons */}
          <div className="button-container">
            <button aria-label="Settings">Settings</button>
            <button aria-label="Preferences">Preferences</button>
            <button aria-label="Compensation">Compensation</button>
            <button aria-label="Benefits">Benefits</button>
            <button aria-label="Contact">Contact</button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <hr />
        <span className="text-reset">Mona Ueno</span><br />
        <a href="https://github.com/monaueno/startup-example/blob/main/README.md">Github</a>
      </footer>
    </div>
  );
}

export default Profile;
