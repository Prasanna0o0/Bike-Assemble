// src/Components/NavBar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";
const NavBar = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role');

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    navigate('/');
  };

  return (
    <nav>
      <div>
        {/* <Link to="/">Home</Link> */}
        <Link to="/assemble">Bike Assemble</Link>
        {token && role === 'admin' && (
          <Link to="/dashboard">Dashboard</Link>
        )}
      </div>
      <div>
        {token ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
