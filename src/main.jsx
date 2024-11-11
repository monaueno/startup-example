// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'; // Import global reset or basic styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
