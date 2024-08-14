const jwt = require("jsonwebtoken");

const CryptoJS = require("crypto-js");
const secretKey = process.env.SECRET_KEY;

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
    encryptResponse,
    decryptRequest,
  };
  