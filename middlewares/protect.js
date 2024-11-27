const jwt = require("jsonwebtoken");
const userModels = require("../models/user-models");

module.exports.protect = async (req, res, next) => {
  if (req.cookies.token) {
    try {
      // Verify the JWT token
      const data = jwt.verify(req.cookies.token, process.env.SECRET_URI);
      
      // Fetch the user without the password field
      req.user = await userModels.findOne({ email: data.email }).select("-password");

      // Call the next middleware or route handler
      next();
    } catch (err) {
      // If there's an error during verification (e.g., expired token)
      res.status(401).send("Not authorized, invalid token");
    }
  } else {
    // If no token is found in the cookies
    res.status(401).send("Not authorized, you don't have permission to access this resource");
  }
};
