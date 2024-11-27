const express=require("express")
const {protect}=require("../middlewares/protect")
const Router  = express.Router();
const {loginUser,logoutUser,registerUser,userProfile}=require("../controllers/authController")
// Router.use("/register",registerUser)
// Router.use("/login",loginUser)
// Router.use("/profile",protect ,userProfile)
// Router.use("/logout",logoutUser)
Router.post('/register', registerUser); // Registration route
Router.post('/login', loginUser); // Login route
Router.get('/profile', protect, userProfile); // Protected profile route
Router.delete('/logout', logoutUser); // Logout route

module.exports=Router;