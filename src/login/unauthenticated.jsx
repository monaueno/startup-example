import React from 'react';

export function Unauthenticated({ onLogin }) {
  return (
    <div>
      <h2>Please log in</h2>
      <button onClick={() => onLogin('DemoUser')}>Log In as DemoUser</button>
    </div>
  );
}
