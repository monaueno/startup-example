import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Main app that handles routes
import './index.css'; // Optional global styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);




import React from 'react';
import './about.css';
import placeholder from '../../public/placeholder.jpg'; // Adjust path if necessary

export function About() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <div>
        <div id="picture" className="picture-box">
          <img src={placeholder} alt="random" />
        </div>

        <p>
          Simon is a repetitive memory game where you follow the demonstrated color sequence until you make a mistake.
          The longer the sequence you repeat, the greater your score.
        </p>

        <p>
          The name Simon is a registered trademark of Milton-Bradley. Our use of the name and the game is for non-profit
          educational use only. No part of this code or program should be used outside of that definition.
        </p>

        <div id="quote" className="quote-box bg-light text-dark">
          <p className="quote">Words are cheap. Show me the code.</p>
          <p className="author">Linus Torvalds</p>
        </div>
      </div>
    </main>
  );
}
