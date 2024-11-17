import React from 'react';
import './Profile.css';

export function Profile(props) {
    const [imageUrl, setImageUrl] = React.useState();
    const [button, setButton] = React.useState()
    const [activeSection, setActiveSection] = useState('');
}

React.useEffect(() => {
    setImageUrl('placeholder.jpg');
    setButton();
}, []);

return(
    <main className='container-fluid bg-secondary text-center'>
        <div>
            <div iid='picture' className='picture-box'>
                <img src={imageUrl} alt='random image' />
            </div>
            <div id="button" className="button-container">
                <button
                    className="btn-settings"
                    onClick={() =>setActiveSection('Settings')}
                >
                    Show Settings
                </button>
                <button
                    className="btn-preferences"
                    onClick={() =>setActiveSection('Preferences')}
                >
                    Show Preferences
                </button>
                <button
                    className="btn-compensation"
                    onClick={() =>setActiveSection('Compensation')}
                >
                    Show Compensation
                </button>
                <button
                    className="btn-benefits"
                    onClick={() =>setActiveSection('Benefits')}
                >
                    Show Benefits
                </button>
                <button
                    className="btn-contact"
                    onClick={() =>setActiveSection('Contact')}
                >
                    Show Contact
                </button>
            </div>
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
                {activeSection === 'Benefits' && (
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
                        <p>Reach out to support or management here. </p>
                    </div>
                )}
            </div>
        </div>
    </main>
)