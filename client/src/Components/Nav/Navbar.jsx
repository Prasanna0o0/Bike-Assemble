import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const NavBar = () => {
  const navigate = useNavigate();
    // Retrieve and parse the Token and role object
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  // Retrieve and parse the user object
  const user = sessionStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;


  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav>
      <div>

        {token && parsedUser?.id ? "" : <Link to="/">Signin</Link>}
        {token && role ? <Link to="/assemble">Bike Assemble</Link> : ""}
        {token && role === "admin" && <Link to="/dashboard">Dashboard</Link>}
        {/* Display the username if available */}
        {parsedUser?.username ? <h4>User : {parsedUser?.username}</h4> : " "}
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
