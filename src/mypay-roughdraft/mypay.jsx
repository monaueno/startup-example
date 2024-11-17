// src/pages/MyPay.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './mypay.css';

const payrollData = [
  { date: '9/1', amount: '$84.00', hours: '5.6' },
  { date: '8/31', amount: '$111.00', hours: '7.4' },
  { date: '8/30', amount: '$102.00', hours: '6.8' },
];

function MyPay() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
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

      {/* Main Content */}
      <main>
        <h1>Payroll</h1>
        <section className="last-entry" aria-label="Last payroll entry">
          <h3>Last Entry</h3>
          <h2 className="amount">$105.00</h2>
          <p className="hours">Hours Worked: 7</p>
        </section>

        <section aria-label="Payroll history">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Hours Worked</th>
              </tr>
            </thead>
            <tbody>
              {payrollData.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.amount}</td>
                  <td>Hours Worked: {entry.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
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

export default MyPay;
