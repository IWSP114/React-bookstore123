import CryptoJS from 'crypto-js';

// Set your secret key (store it securely, e.g., in environment variables)
const SECRET_KEY = 'your-secret-key';

// Function to encrypt data
export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Function to decrypt data
export const decryptData = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};