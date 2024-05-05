import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './navbarcss.css';
import NavigationBar from './navbar';

function Profile() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Fetch user data from the server
    axios.get('http://localhost:8000/api/user')
      .then(function(response) {
        const userData = response.data;
        console.log(userData.user)
        setUsername(userData.user);
      })
      .catch(function(error) {
        console.error('Error fetching user data:', error);
      });
  });

  const handleSignOut = () => {
    console.log('Signing out...');
    // Implement sign-out logic here
    window.location.href = '/signup';
  };

  return (
    <div className="navbar-items">
      <NavigationBar />
      <div className="profile-container">
        <h1>Profile Page</h1>
        <p>Welcome, {username || 'Guest'}!</p> 
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default Profile;
