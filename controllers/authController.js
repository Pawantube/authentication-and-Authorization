const UserModel = require("../models/user-models"); // Use consistent naming
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateTokens");

// module.exports.registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // Check if the user already exists
//     let user = await UserModel.findOne({ email });
//     if (user) {
//       return res.status(400).send("User already registered");
//     }

//     // Generate salt and hash the password
//     const salt = await bcrypt.genSalt(10); // 10 is the number of rounds of salt
//     const hashedPassword = await bcrypt.hash(password, salt); // Pass both password and salt

//     // Create the new user
//     user = await UserModel.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     // Generate a JWT token for the user
//     const token = generateToken(user);

//     // Set the token in the cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production', // Only set secure cookies in production
//       maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//     });

//     res.status(201).send({
//       message: "User registered successfully",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };
module.exports.registerUser = async (req, res) => {
	const { name, email, password } = req.body;
  
	try {
	  // Check if the user already exists
	  let user = await UserModel.findOne({ email });
	  if (user) {
		return res.status(400).send("User already registered");
	  }
  
	  // Generate salt and hash the password
	  const salt = await bcrypt.genSalt(10); // 10 is the number of rounds of salt
	  const hashedPassword = await bcrypt.hash(password, salt); // Pass both password and salt
  
	  // Create the new user
	  user = new UserModel({
		name,
		email,
		password: hashedPassword, // Use the hashed password
	  });
  
	  // Save the new user to the database
	  await user.save();
  
	  // Generate a JWT token for the user
	  const token = generateToken(user);
  
	  // Set the token in the cookie
	  res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production', // Only set secure cookies in production
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
	  });
  
	  res.status(201).send({
		message: "User registered successfully",
		user: {
		  id: user._id,
		  name: user.name,
		  email: user.email,
		},
	  });
	} catch (err) {
	  res.status(500).send(err.message);
	}
  };
  
module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    let user = await UserModel.findOne({ email });

    // If user doesn't exist, return an error
    if (!user) {
      return res.status(400).send("Email or password is incorrect");
    }

    // Compare the provided password with the stored hashed password
    let result = await bcrypt.compare(password, user.password);

    if (result) {
      // If password matches, generate a token
      let token = generateToken(user);

      // Set the token in the cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only set secure cookies in production
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.status(200).send({
        message: "Logged in successfully",
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    } else {
      return res.status(400).send("Email or password is incorrect");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.logoutUser = (req, res) => {
  // Clear the cookie by setting an expired date
  res.cookie("token", "", { expires: new Date(0) });
  res.status(200).send("Logged out successfully");
};

module.exports.userProfile = async (req, res) => {

  try {
    // Get the user from the decoded token
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).send({
      name: user.name,
      email: user.email,
      _id: user._id,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
