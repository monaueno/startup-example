import React from 'react';
import './login.css'

export function Login() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <div>
        <h1>Welcome to TodayPay</h1>
        <form method="get" action="/play">
          <div className="input-group mb-3">
            <span className="input-group-text">@</span>
            <input className="form-control" type="text" placeholder="your@email.com" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">🔒</span>
            <input className="form-control" type="password" placeholder="password" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          <button type="button" className="btn btn-secondary">Create</button>
        </form>
      </div>
    </main>
  );
}
