const UserModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;
const userRegistration = async (req, res) => {
  try {
    // Destructure user details from request body
    const { name, phone, email, isManager, address } = req.body;

    console.log("userRegistration  req.body:", req.body);
    
   const password =  res.locals.hashedPassword 
    // console.log("userRegistration  password:", res.locals);
    
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User with the provided email or phone number already exists",
      });
    }

    const newUser = new UserModel({
      name,
      phone,
      email,
      password,
      isManager,
      address,
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    res.status(201).json({ success: true, user: savedUser });
  } catch (error) {
    // Check for validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );

      return res.status(400).json({ success: false, errors: validationErrors });
    }
    console.error("Error in user registration:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
const userLogin = async (req, res) => {
  try {
    // Destructure user details from request body
    const { email, phone, password } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({
      $or: [{ email }, { phone }],
    });

    // console.log("userLogin  user:", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Check if the password is correct
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET, // Use a secure, secret key for signing the token
      { expiresIn: "1d" } // Token expires in 1 hour
    );

    // Send the token in the response
    res.status(200).json({ success: true, token });
  } catch (error) {
    // Handle other errors
    console.error("Error in user login:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// module.exports = userLogin;
const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await UserModel.find();

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error getting all users:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const getuserDetails = async (req, res) => {
  try {
    const token = req.query.token; // Assuming the token is passed as a query parameter

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized access",
        message: "No token found",
      });
    }

    jwt.verify(token, JWT_SECRET, async function (err, decoded) {
      if (err) {
        return res.status(401).json({
          success: false,
          error: "Unauthorized access",
          message: err.message,
        });
      } else {
        const userId = decoded.userId;

        // Fetch user data based on the user ID
        const userData = await UserModel.findById(userId);

        if (!userData) {
          return res.status(404).json({
            success: false,
            error: "User not found",
          });
        }

        res.status(200).json({
          success: true,
          user: userData,
        });
      }
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
module.exports = {userRegistration, userLogin, getAllUsers,getuserDetails};
