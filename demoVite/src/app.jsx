import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login';
import { Play } from './play';
import { Scores } from './scores';
import { About } from './about';

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className='body bg-dark text-light'>
      <header className="container-fluid">
  <nav className="navbar navbar-expand-lg navbar-dark">
    <div className="container d-flex align-items-center">
      <a className="navbar-brand" href="#">
        Simon<sup>&reg;</sup>
      </a>
      <div className="navbar-nav d-flex flex-row">
        <NavLink className="nav-link" to="/">
          Login
        </NavLink>
        <NavLink className="nav-link" to="/play">
          Play
        </NavLink>
        <NavLink className="nav-link" to="/scores">
          Scores
        </NavLink>
        <NavLink className="nav-link" to="/about">
          About
        </NavLink>
      </div>
    </div>
  </nav>
</header>



        <main>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/play' element={<Play />} />
            <Route path='/scores' element={<Scores />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>

        <footer className='bg-dark text-white-50'>
          <div className='container-fluid'>
            <span className='text-reset'>Author Name(s)</span>
            <a className='text-reset' href='https://github.com/webprogramming260/simon-react'>
              Source
            </a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

  
  
