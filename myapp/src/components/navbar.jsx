// NavigationBar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './navbarcss.css';
function NavigationBar() {

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        
      </div>
      <div className="navbar-items">
        <Link to="/taskmanager">Taskmanager</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        
      </div>
    </nav>
  );
}

export default NavigationBar;
