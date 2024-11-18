import React from 'react';

export function Authenticated({ userName, onLogout }) {
  return (
    <div>
      <h2>Welcome, {userName}!</h2>
      <button onClick={onLogout}>Log Out</button>
    </div>
  );
}
