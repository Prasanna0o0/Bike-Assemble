import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = sessionStorage.getItem('token');
  const userRole = sessionStorage.getItem('role');

  // Check if there is a token
  if (!token) {
    return <Navigate to="/" />;
  }

  // Check if the user's role is in the allowedRoles array
  return allowedRoles[0].includes(userRole) ? children : <Navigate to="/assemble" />;
};

export default ProtectedRoute;
