// src/pages/ClockIn.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './clockin.css';

function ClockIn() {
  const navigate = useNavigate();
  const [historyVisible, setHistoryVisible] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  const activateButton = (action) => {
    setActiveButton(action);
  };

  const toggleHistory = () => {
    setHistoryVisible(!historyVisible);
  };

  return (
    <div>
      <header>
        <h1>TodayPay!</h1>
        <nav>
          <ul>
            <li><Link to="/">Log In</Link></li>
            <li><Link to="/clockin" className="active">Clock In</Link></li>
            <li><Link to="/mypay">My Pay</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
        <button className="logout-button" onClick={() => navigate('/')}>Log Out</button>
      </header>

      <main>
        <div className="employees">
          <span className="time">1:31:28pm</span>
        </div>

        <div>
          <button
            id="clockInButton"
            className={`action-button ${activeButton === 'clockIn' ? 'active' : ''}`}
            onClick={() => activateButton('clockIn')}
          >
            Clock In
          </button>
          <button
            id="clockOutButton"
            className={`action-button ${activeButton === 'clockOut' ? 'active' : ''}`}
            onClick={() => activateButton('clockOut')}
          >
            Clock Out
          </button>
        </div>

        <div className="notification-table">
          <ul className="notification">
            <li className="employees">Josh: 1:20pm - Clocked Out</li>
            <li className="employees">Grace: 1:09pm - Clocked In</li>
            <li className="employees">Josh: 10:15am - Clocked in</li>
          </ul>
        </div>

        <div className="history-section">
          <span className="see-more" onClick={toggleHistory}>See History</span>
          {historyVisible && (
            <div className="history-content">
              <ul className="history-list">
                <li className="employees">Kevin: 10:15am - Clocked in</li>
                <li className="employees">Kevin: 1:20pm - Clocked out</li>
                <li className="employees">Greg: 1:09pm - Clocked in</li>
                <li className="employees">Greg: 1:30pm - Clocked out</li>
              </ul>
            </div>
          )}
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

export default ClockIn;
