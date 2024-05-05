import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import TaskManager from './components/taskmanager';
import Profile from './components/profile';
import Homepage from './components/homepage';

function App() {
  const [username, setUsername] = useState('');

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/taskmanager" element={<TaskManager />} />
          {/* Pass the username state as a prop to the Profile component */}
          <Route path="/profile" element={<Profile username={username} />} />
          <Route path="/profile/:username" component={Profile} />
          <Route path="" element={<Homepage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
