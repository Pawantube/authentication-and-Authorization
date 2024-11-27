require('dotenv').config({ path: './.env' }); // Load environment variables
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes=require("./routes/authRoutes")
const app = express(); // Create an Express app instance
const cors=require("cors")
// Middleware
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	cors({
	  origin: "http://localhost:3000", // Frontend URL
	  credentials: true,
	})
  );
  

// Database connection
connectDB();

app.use("/api/auth",authRoutes);
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
});
// Export the configured app
