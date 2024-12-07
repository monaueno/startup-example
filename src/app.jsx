import React, { useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import MyPay from './mypay/mypay';
import ClockIn from './clockin/clockin';
import Profile from './profile/profile';
import Login from './login/login';
import { LogTimeProvider } from './clockin/logtime';
import { AuthState } from './login/authState'; // Import the AuthState enum
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

// Header Component
function Header({ isAuthenticated, handleLogout }) {
  const navigate = useNavigate(); // Now safely within a Router context

  const onLogoutClick = () => {
    handleLogout();
    navigate('/'); // Navigate to login page
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-brand">
          <NavLink to="/">TodayPay!</NavLink>
        </div>
          <div className="navbar-items">
          <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
              {isAuthenticated ? (
                <>
                  <li style={{ margin: 0, padding: 0 }} >
                    <NavLink className="nav-link" to="/clockin">
                      Clock In
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link" to="/mypay">
                      My Pay
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link" to="/profile">
                      Profile
                    </NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <NavLink className="nav-link" to="/">
                    Log In
                  </NavLink>
                </li>
              )}
            </ul>
            {isAuthenticated && (
              <button className="logout-button" onClick={onLogoutClick}>
                Log Out
              </button>
            )}
        </div>
      </nav>
    </header>
  );
}

// App Component
export default function App() {
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [authState, setAuthState] = useState(
    userName ? AuthState.Authenticated : AuthState.Unauthenticated
  );

  const handleAuthChange = (newUserName, newAuthState) => {
    setUserName(newUserName);
    setAuthState(newAuthState);

    if (newAuthState === AuthState.Authenticated) {
      localStorage.setItem('userName', newUserName);
    } else {
      localStorage.removeItem('userName');
    }
  };

  return (
    <LogTimeProvider>
      <BrowserRouter>
        <div className="body bg-light text-dark">
          <Header
            isAuthenticated={authState === AuthState.Authenticated}
            handleLogout={() => handleAuthChange('', AuthState.Unauthenticated)}
          />

          {/* Routes */}
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  userName={userName}
                  authState={authState}
                  onAuthChange={handleAuthChange}
                />
              }
            />
            {authState === AuthState.Authenticated && (
              <Route path="/clockin" element={<ClockIn userName={userName} />} />
            )}
            {authState === AuthState.Authenticated && (
              <Route path="/mypay" element={<MyPay userName={userName} />} />
            )}
            {authState === AuthState.Authenticated && (
              <Route path="/profile" element={<Profile userName={userName} />} />
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Footer */}
          <footer className="bg-dark text-light py-3">
            <div className="container-fluid text-center">
              <span className="text-reset">Mona Ueno</span>
              <br />
              <a
                className="text-reset"
                href="https://github.com/monaueno/startup-example/blob/main/README.md"
              >
                Github
              </a>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </LogTimeProvider>
  );
}

// NotFound Component
function NotFound() {
  return (
    <main className="container-fluid bg-secondary text-center py-5">
      <h1>404: Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </main>
  );
}
