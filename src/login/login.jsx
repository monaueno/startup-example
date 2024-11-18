import React from 'react';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
  console.log('Login Component Props:', { userName, authState });

  return (
    <main className="container-fluid bg-secondary text-center">
      <h1>Welcome to TodayPay!</h1>
      {authState === AuthState.Authenticated && (
        <Authenticated
          userName={userName}
          onLogout={() => onAuthChange('', AuthState.Unauthenticated)}
        />
      )}
      {authState === AuthState.Unauthenticated && (
        <Unauthenticated
          onLogin={(loginUserName) => onAuthChange(loginUserName, AuthState.Authenticated)}
        />
      )}
    </main>
  );
}
