// src/pages/Profile.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './profile.css';

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
        <h1>User Profile</h1>
        <div className="profile-info">
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> johndoe@example.com</p>
          <p><strong>Position:</strong> Software Engineer</p>
          <p><strong>Member Since:</strong> January 2022</p>
        </div>

        <div className="profile-actions">
          <button onClick={() => navigate('/edit-profile')} className="edit-button">Edit Profile</button>
          <button onClick={() => navigate('/settings')} className="settings-button">Settings</button>
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
