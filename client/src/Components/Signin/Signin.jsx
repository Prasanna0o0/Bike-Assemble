import React, { useState } from "react";
import { registerUser } from "../../Services/Service";
import { useNavigate } from "react-router-dom";
import "./Signin.css"; // Import the CSS file for styling

const Signin = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default to 'user'
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  // Validation functions
  const validateName = (name) => {
    if (!name) return "Name is required";
    return "";
  };

  const validateUsername = (username) => {
    if (!username) return "Please Enter your (Email)";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) return "Invalid email format";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Please Enter your Password";
    if (password.length < 6) return "Password must be at least 6 characters long";
    return "";
  };

  // Handle changes in input fields
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    const error = validateName(value);
    setFormErrors((prevErrors) => ({ ...prevErrors, name: error }));
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    const error = validateUsername(value);
    setFormErrors((prevErrors) => ({ ...prevErrors, username: error }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const error = validatePassword(value);
    setFormErrors((prevErrors) => ({ ...prevErrors, password: error }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // Final validation before submitting
    const errors = {
      name: validateName(name),
      username: validateUsername(username),
      password: validatePassword(password),
    };
    setFormErrors(errors);

    if (Object.values(errors).some(error => error)) {
      setMessage("");
      return;
    }

    try {
      const userData = { name, username, password, role };
      const response = await registerUser(userData);

      if (response && response.message) {
        setMessage(response.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
      setError("");
    } catch (err) {
      setError(err.message);
      setMessage("");
    }
  };

  return (
    <div className="register-container">
      <h2>Signin</h2>
      <form onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            required
          />
          {formErrors.name && <span className="error-message">{formErrors.name}</span>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Username (Email)"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          {formErrors.username && <span className="error-message">{formErrors.username}</span>}
        </div>

        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="eye-button"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {formErrors.password && <span className="error-message">{formErrors.password}</span>}
        </div>

        <div>
          <input
            type="radio"
            value="admin"
            checked={role === "admin"}
            onChange={(e) => setRole(e.target.value)}
          />
          <label className="labelsradio1">Admin</label>
          <input
            type="radio"
            value="user"
            checked={role === "user"}
            onChange={(e) => setRole(e.target.value)}
          />
          <label className="labelsradio2">User</label>
        </div>

        <button type="submit">Register</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Signin;
