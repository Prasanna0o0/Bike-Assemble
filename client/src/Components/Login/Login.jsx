import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Services/Service'; // Import the service function
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await login(username, password);

      if (token && user.role) {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('role', user.role);
        sessionStorage.setItem('user', user);

        // Redirect based on user role
        if (user.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/assemble');
        }
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <br />
      <br />
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
