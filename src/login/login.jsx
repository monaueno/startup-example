// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock login validation
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === "test@todaypay.com" && password === "password123") {
      navigate('/clockin'); // Navigate to Clock In page after successful login
    } else {
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  const handleCreateAccount = () => {
    navigate('/create');
  };

  return (
    <div>
      {/* Header */}
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

      {/* Main Content */}
      <main>
        <section className="left-section" aria-label="Welcome section">
          <h1>Get Paid Today!</h1>
        </section>

        <section className="right-section" aria-label="Login form">
          <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  required
                />
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button type="submit">Login</button>
              <button type="button" onClick={handleCreateAccount}>Create Account</button>
            </form>
          </div>
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

export default Login;
