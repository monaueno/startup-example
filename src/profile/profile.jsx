import React, { useState, useEffect } from 'react';
import './profile.css';
import LiveChat from './LiveChat'; // Import the LiveChat component

export default function Profile(props) {
  const [imageUrl, setImageUrl] = useState('');
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    setImageUrl('https://github.com/user-attachments/assets/c5e45706-3790-4d60-8a9b-f0c979f2b18f');
  }, []);

  return (
    <main className="container-fluid bg-secondary text-center">
      <div>
        <div id="picture" className="picture-box">
          <img src={imageUrl} alt="Profile" />
        </div>
        <div id="button" className="button-container">
          <button
            className="btn-settings"
            onClick={() => setActiveSection('Settings')}
          >
            Settings
          </button>
          <button
            className="btn-preferences"
            onClick={() => setActiveSection('Preferences')}
          >
            Preferences
          </button>
          <button
            className="btn-compensation"
            onClick={() => setActiveSection('Compensation')}
          >
            Compensation
          </button>
          <button
            className="btn-benefits"
            onClick={() => setActiveSection('Benefits')}
          >
            Benefits
          </button>
          <button
            className="btn-contact"
            onClick={() => setActiveSection('Contact')}
          >
            Contact
          </button>
        </div>
        <div className="dynamic-content">
          {activeSection === 'Settings' && (
            <div>
              <h2>Settings</h2>
              <p>Manage your account settings here.</p>
            </div>
          )}
          {activeSection === 'Preferences' && (
            <div>
              <h2>Preferences</h2>
              <p>Set your preferences for the application here.</p>
            </div>
          )}
          {activeSection === 'Compensation' && (
            <div>
              <h2>Compensation</h2>
              <p>View and manage your compensation details here.</p>
            </div>
          )}
          {activeSection === 'Benefits' && (
            <div>
              <h2>Benefits</h2>
              <p>Explore the benefits offered to you here.</p>
            </div>
          )}
          {activeSection === 'Contact' && (
            <div>
              <h2>Contact</h2>
              <LiveChat />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}