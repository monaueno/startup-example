// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import './index.css';

console.log("main.jsx is running");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
