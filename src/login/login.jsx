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
        {authState !== AuthState.Unknown && <h1>Please Login</h1>}
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
    </main>
  );
}
