import React, { useState } from 'react';


function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(isSignup ? 'http://localhost:8000/api/signup' : 'http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      console.log('data',data)
      if (response.ok) {
        console.log(isSignup ? 'User signed up successfully!' : 'Login successful!');
        // Redirect to profile page passing username as prop
        window.location.href = '/profile';
      } else {
        console.error('Error:', data.error);
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage('An error occurred');
    }
  };
  
  

  // Toggle signup/login mode
  const toggleSignup = () => {
    setIsSignup(!isSignup);
    setErrorMessage(''); 
  };

  return (
    <div className="signin-container">
      <h1>{isSignup ? 'Sign Up' : 'Sign In'}</h1>
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
        <button type="submit">{isSignup ? 'Sign Up' : 'Sign In'}</button>
      </form>
      <p>
        {isSignup ? 'Already have an account?' : "Don't have an account?"}
        <span onClick={toggleSignup}> {isSignup ? 'Sign In' : 'Sign Up'}</span>
      </p>
    </div>
  );
}

export default Signup;
