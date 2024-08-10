import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import AssembleBike from './Components/Assembly/Assembly';
import Dashboard from './Components/Admin/AdminDashboard';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import NavBar from './Components/Nav/Navbar'; // Import NavBar
import Signin from './Components/Signin/Signin';

function App() {
  return (
    <Router>
      <NavBar /> {/* Add NavBar here */}
      <br></br>
      <br></br>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/assemble" element={<AssembleBike />} />
        <Route path="/" element={<Signin />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
