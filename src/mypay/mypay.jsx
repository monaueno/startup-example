// src/pages/MyPay.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './mypay.css';

function MyPay() {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <h1>TodayPay!</h1>
        <nav>
          <ul>
            <li><Link to="/">Log In</Link></li>
            <li><Link to="/clockin">Clock In</Link></li>
            <li><Link to="/mypay" className="active">My Pay</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
        <button className="logout-button" onClick={() => navigate('/')}>Log Out</button>
      </header>

      <main>
        <h1>Payroll</h1>
        <div className="last-entry">
          <h3>Last Entry</h3>
          <h2 className="amount">$105.00</h2>
          <p className="hours">Hours Worked: 7</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Hours Worked</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>9/1</td>
              <td>$84.00</td>
              <td>Hours Worked: 5.6</td>
            </tr>
            <tr>
              <td>8/31</td>
              <td>$111.00</td>
              <td>Hours Worked: 7.4</td>
            </tr>
            <tr>
              <td>8/30</td>
              <td>$102.00</td>
              <td>Hours Worked: 6.8</td>
            </tr>
          </tbody>
        </table>
      </main>

      <footer>
        <hr />
        <span className="text-reset">Mona Ueno</span><br />
        <a href="https://github.com/monaueno/startup-example/blob/main/README.md">Github</a>
      </footer>
    </div>
  );
}

export default MyPay;
