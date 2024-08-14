const express = require("express");
const { authenticateToken } = require("../Auth/middleware");
const { login, getEmployeeProduction,registerUser } = require("../Controllers/Employee");
const { assembleBike } = require("../Controllers/bikeAssembler");
const { getDashboard } = require("../Controllers/adminDashboard");

const router = express.Router();

// Public routes
router.post("/registerUser", registerUser);
router.post("/login", login);


// Protected routes (require authentication)
router.post("/assemble", authenticateToken, assembleBike);
router.post("/dashboard", authenticateToken, getDashboard);
router.post("/employee-production", authenticateToken, getEmployeeProduction);

module.exports = router;
