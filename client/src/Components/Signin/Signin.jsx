import React, { useState } from "react";
import { registerUser } from "../../Services/Service";
import { useNavigate } from "react-router-dom";
import "./Signin.css"; // Import the CSS file for styling

const Signin = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    role: "user", // Default to 'user'
  });

  const [formErrors, setFormErrors] = useState({
    nameError: "",
    usernameError: "",
    passwordError: "",
    roleError: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Validation functions
  const validateName = (name) => (!name ? "Name is required" : "");
  const validateUsername = (username) => {
    if (!username) return "Please enter your email";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(username) ? "Invalid email format" : "";
  };
  const validatePassword = (password) => {
    if (!password) return "Please enter your password";
    return password.length < 6
      ? "Password must be at least 6 characters long"
      : "";
  };
  // handle onchange input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate individual field
    let error = "";
    if (name === "name") error = validateName(value);
    if (name === "username") error = validateUsername(value);
    if (name === "password") error = validatePassword(value);

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [`${name}Error`]: error,
    }));
  };

  //handle submit
  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const nameError = validateName(formData.name);
    const usernameError = validateUsername(formData.username);
    const passwordError = validatePassword(formData.password);

    setFormErrors({
      nameError,
      usernameError,
      passwordError,
      roleError: "", // Assuming no specific role error
    });

    if (nameError || usernameError || passwordError) {
      setMessage(""); // Clear message if there are errors
      return;
    }

    try {
      const response = await registerUser(formData);
      if (response && response.message) {
        setMessage(response.message);
        setTimeout(() => navigate("/login"), 3000); // Redirect after 2 seconds
      }
      setError("");
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
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
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          {formErrors.nameError && (
            <span className="error-message">{formErrors.nameError}</span>
          )}
        </div>

        <div>
          <input
            type="text"
            name="username"
            placeholder="Username (Email)"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          {formErrors.usernameError && (
            <span className="error-message">{formErrors.usernameError}</span>
          )}
        </div>

        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="eye-button"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {formErrors.passwordError && (
            <span className="error-message">{formErrors.passwordError}</span>
          )}
        </div>

        <div>
          <input
            type="radio"
            name="role"
            value="admin"
            checked={formData.role === "admin"}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          <label className="labelsradio1">Admin</label>
          <input
            type="radio"
            name="role"
            value="user"
            checked={formData.role === "user"}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
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
