import React, { useState, useEffect } from 'react';
import { Index } from './index';
import './profile.css';
import placeholder from '/Users/monaueno/Desktop/CS260/startup-example/startup-project/public/placeholder.jpg';

export function Profile() {
  const [imageUrl, setImageUrl] = useState(placeholder);
  const [button, setButton] = useState('');

return(
  <main className="container-fluid bg-secondary text-center">
    <div>
      {/* Profile Picture Section*/}
      <div id="picture" className="picture-box">
        <img src={imageUrl} alt="Profile" />
      </div>

      {/* Dynamic Section */}
      <Index />
    </div>
  </main>
)
}
