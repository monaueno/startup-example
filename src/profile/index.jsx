import React, { useState } from 'react'; // Import useState for state management
import './about.css';
import placeholder from '/Users/monaueno/Desktop/CS260/startup-example/startup-project/public/placeholder.jpg';

export function About() {
  const [activeSection, setActiveSection] = useState(''); // Track the active section

  return (
    <main className="container-fluid bg-secondary text-center">
      <div>
        {/* Image Section */}
        <div id="picture" className="picture-box">
          <img src={placeholder} alt="random" />
        </div>

        {/* Button Section */}
        <div id="button" className="button-container">
          <button
            className="btn-settings"
            onClick={() => setActiveSection('Settings')}
          >
            Show Settings
          </button>
          <button
            className="btn-preferences"
            onClick={() => setActiveSection('Preferences')}
          >
            Show Preferences
          </button>
          <button
            className="btn-compensation"
            onClick={() => setActiveSection('Compensation')}
          >
            Show Compensation
          </button>
          <button
            className="btn-benefits"
            onClick={() => setActiveSection('Benefits')}
          >
            Show Benefits
          </button>
          <button
            className="btn-contact"
            onClick={() => setActiveSection('Contact')}
          >
            Show Contact
          </button>
        </div>

        {/* Dynamic Content Section */}
        <div className="dynamic-content">
          {activeSection === '' && <p>Click a button to display content here.</p>}
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
              <p>Reach out to support or management here.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
