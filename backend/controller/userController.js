const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find a user by email
    const user = await User.findOne({ email });

    if (!user) {
      // User not found
      return res
        .status(401)
        .json({ message: "Login Failed: Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      // Passwords match, authentication successful
      res.json({ message: "Login Successful" });
    } else {
      // Passwords do not match, authentication failed
      res.status(401).json({ message: "Login Failed: Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login Failed: Internal server error" });
  }
};

// Signup User
const signupUser = async (req, res) => {
  try {
    const { email, password, name, passwordConfirm } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Account with this email already exists" });
    }

    if (!email.endsWith("@gmail.com")) {
      return res.status(400).json({ message: "Please use a Gmail address" });
    }

    if (password.length < 8 || password !== passwordConfirm) {
      return res.status(400).json({
        message: "Passwords must be at least 8 characters long and match",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPasswordConfirm = await bcrypt.hash(passwordConfirm, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      passwordConfirm: hashedPasswordConfirm,
    });

    res.json({ message: "Signup Successful", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Signup Failed: Internal server error" });
  }
};

module.exports = { loginUser, signupUser };
