import React, { useState } from 'react';
import './loginstyle.css'
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simulate form submission (replace with your backend logic)
    if (username === 'user' && password === 'password') {
      // Login successful
      console.log('Login successful!');
      // Redirect to main app or handle successful login here
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="signin-container">
      <h1>Sign In</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Login;