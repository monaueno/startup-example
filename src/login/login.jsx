import React from 'react';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';
import './login.css'

export default function Login({ userName, authState, onAuthChange }) {
  return (
    <main className="login-page">
      {/* Left Section */}
      <div className="login-left">
        <h1>Get Paid Today!</h1>
      </div>

      {/* Right Section */}
      <div className="login-right">
        <div className="login-box">
          {/* Display greeting or login prompt */}
          {authState === AuthState.Authenticated ? (
            <h2>Hello, {userName}</h2>
          ): (
            <h2>Please Login</h2>
          )}
        {authState === AuthState.Authenticated && (
          <Authenticated
            userName={userName}
            onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)}
          />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
      </div>
    </main>
  );
}
