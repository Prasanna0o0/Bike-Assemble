const jwt = require("jsonwebtoken");
const { decryptRequest } = require("./Crypto");


const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // Unauthorized if no token

  const decryptedToken = decryptRequest(token);

  jwt.verify(decryptedToken, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden if token is invalid
    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
};
