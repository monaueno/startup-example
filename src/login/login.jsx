// src/pages/Login.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css'; // Assuming you moved your styles to Login.css

function Login() {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/create'); // Adjust if you set up a route for account creation
  };

  return (
    <div>
      <header>
        <h1>TodayPay!</h1>
        <nav>
          <ul>
            <li><Link to="/" className="active">Log In</Link></li>
            <li><Link to="/clockin">Clock In</Link></li>
            <li><Link to="/mypay">My Pay</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="left-section">
          <h1>Get Paid Today!</h1>
        </div>
        <div className="right-section">
          <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={(e) => { e.preventDefault(); navigate('/clockin'); }}>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="your@email.com" required />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="password" required />
              </div>
              <button type="submit">Login</button>
              <button type="button" onClick={handleCreateAccount}>Create</button>
            </form>
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

export default Login;
