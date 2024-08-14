const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_jwt_secret";
const CryptoJS = require("crypto-js");

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // Unauthorized if no token

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden if token is invalid
    req.user = user;
    next();
  });
};

const secretKey = 'my-secret-key';

// Encryption Function
const encryptResponse = (data) => {
  try {
    const ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();
    return ciphertext;
  } catch (error) {
    console.error("Encryption failed:", error);
    return null;
  }
};

// Decryption Function
const decryptRequest = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};

module.exports = {
  authenticateToken,
  encryptResponse,
  decryptRequest,
};
