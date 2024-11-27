require('dotenv').config({ path: '../.env' });
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  // Create a payload with necessary user data (excluding sensitive information)
  const payload = {
    userId: user._id,
    name: user.name,
    email: user.email,
  };

  // Sign the token with the payload and set expiration time in options
  return jwt.sign(payload, process.env.SECRET_URI, { expiresIn: '30d' });
};

module.exports = generateToken;
