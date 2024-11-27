const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

// Database connection URI
const dbURI = process.env.MONGO_URI;

// Function to establish a database connection
const connectDB = async () => {
  try {
    if (!dbURI) {
      throw new Error('MONGO_URI is not defined in environment variables.');
    }
    await mongoose.connect(dbURI, {

    });
    console.log('✅ MongoDB connected successfully!');
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit with failure
  }
};

// Export the connection function
module.exports = connectDB;
