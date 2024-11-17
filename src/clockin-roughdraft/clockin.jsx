// src/pages/ClockIn.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './clockin.css';

function ClockIn() {
  const navigate = useNavigate();

  // State to track the active button
  const [activeButton, setActiveButton] = useState(null);

  // State to toggle the visibility of the history section
  const [historyVisible, setHistoryVisible] = useState(false);

  // State to show the current time
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Mock data for notifications and history
  const notifications = [
    { name: "Josh", time: "1:20pm", status: "Clocked Out" },
    { name: "Grace", time: "1:09pm", status: "Clocked In" },
    { name: "Josh", time: "10:15am", status: "Clocked In" },
  ];

  const history = [
    { name: "Kevin", time: "10:15am", status: "Clocked In" },
    { name: "Kevin", time: "1:20pm", status: "Clocked Out" },
    { name: "Greg", time: "1:09pm", status: "Clocked In" },
    { name: "Greg", time: "1:30pm", status: "Clocked Out" },
  ];

  // Update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Handle activating the clock-in or clock-out button
  const activateButton = (action) => {
    setActiveButton(action);
  };

  // Toggle the visibility of the history section
  const toggleHistory = () => {
    setHistoryVisible(!historyVisible);
  };

  return (
    <div>
      {/* Header */}
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

      {/* Main Content */}
      <main>
        {/* Current Time */}
        <div className="employees">
          <span className="time">{currentTime}</span>
        </div>

        {/* Action Buttons */}
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

        {/* Notifications Section */}
        <div className="notification-table">
          <ul className="notification">
            {notifications.map((item, index) => (
              <li key={index} className="employees">
                {item.name}: {item.time} - {item.status}
              </li>
            ))}
          </ul>
        </div>

        {/* History Section */}
        <div className="history-section">
          <span className="see-more" onClick={toggleHistory}>
            {historyVisible ? "Hide History" : "See History"}
          </span>
          {historyVisible && (
            <div className="history-content">
              <ul className="history-list">
                {history.map((item, index) => (
                  <li key={index} className="employees">
                    {item.name}: {item.time} - {item.status}
                  </li>
                ))}
              </ul>
            </div>
          )}
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

export default ClockIn;
