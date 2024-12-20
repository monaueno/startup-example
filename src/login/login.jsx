import React, { useState, useEffect } from 'react';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';
import './login.css';

export default function Login({ userName, authState, onAuthChange }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const city = 'New York'; // Set your default city here

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/weather?city=${city}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <main className="login-page">
      {/* Left Section */}
      <div className="login-left">
        <h1>Get Paid Today!</h1>
        {weather ? (
          <div className="weather-info">
            <h3>Weather in {weather.name}</h3>
            <p>{weather.weather[0].description}</p>
            <p>Temperature: {weather.main.temp}°C</p>
          </div>
        ) : error ? (
          <p className="weather-error">{error}</p>
        ) : (
          <p>Loading weather...</p>
        )}
      </div>

      {/* Right Section */}
      <div className="login-right">
        <div className="login-box">
          {authState === AuthState.Authenticated ? (
            <h2>Hello, {userName}</h2>
          ) : (
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
