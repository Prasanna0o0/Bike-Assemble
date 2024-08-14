import CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_SECRET_KEY;

// Encryption Function
export const encryptRequest = (data) => {
  try {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return ciphertext;
  } catch (error) {
    console.error('Encryption failed:', error);
    return null;
  }
};

// Decryption Function
export const decryptResponse = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
};
