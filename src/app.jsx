import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import MyPay from './mypay/mypay';
import ClockIn from './clockin/clockin';
import Profile from './profile/profile';
import Login from './login/login';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const isAuthenticated = true;
  console.log(isAuthenticated)

  return (
    <BrowserRouter>
      <div className='body bg-light text-dark'>
        {/* Header */}
        <header className='container-fluid'>
          <nav className='navbar navbar-expand-lg navbar-light bg-primary'>
            <div className='container-fluid'>
              <NavLink className='navbar-brand text-light' to='/'>
                TodayPay!
              </NavLink>
              <div className='collapse navbar-collapse'>
                <ul className='navbar-nav me-auto'>
                  {!isAuthenticated && (
                    <li className='nav-item'>
                      <NavLink className='nav-link text-light' to='/'>
                        Log In
                      </NavLink>
                    </li>
                  )}
                  {isAuthenticated && (
                    <>
                      <li className='nav-item'>
                        <NavLink className='nav-link text-light' to='/clockin'>
                          Clock In
                        </NavLink>
                      </li>
                      <li className='nav-item'>
                        <NavLink className='nav-link text-light' to='/mypay'>
                          My Pay
                        </NavLink>
                      </li>
                      <li className='nav-item'>
                        <NavLink className='nav-link text-light' to='/profile'>
                          Profile
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
                {isAuthenticated && (
                  <button
                    className='btn btn-danger'
                    onClick={() => {
                      setUserName('');
                      localStorage.removeItem('userName');
                    }}
                  >
                    Log Out
                  </button>
                )}
              </div>
            </div>
          </nav>
        </header>

        {/* Routes */}
        <Routes>
          <Route
            path='/'
            element={
              <Login
                onAuth={(userName) => {
                  setUserName(userName);
                  localStorage.setItem('userName', userName);
                }}
              />
            }
          />
          {isAuthenticated && <Route path='/clockin' element={<ClockIn userName={userName} />} />}
          {isAuthenticated && <Route path='/mypay' element={<MyPay />} />}
          {isAuthenticated && <Route path='/profile' element={<Profile />} />}
          <Route path='*' element={<NotFound />} />
        </Routes>

        {/* Footer */}
        <footer className='bg-dark text-light py-3'>
          <div className='container-fluid text-center'>
            <span className='text-reset'>Mona Ueno</span>
            <br />
            <a
              className='text-reset'
              href='https://github.com/monaueno/startup-example/blob/main/README.md'
            >
              Github
            </a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main className='container-fluid bg-secondary text-center py-5'>
      <h1>404: Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </main>
  );
}