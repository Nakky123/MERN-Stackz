const express = require("express");

// Controller function
const { loginUser, signupUser } = require("../controller/userController");

const router = express.Router();

// Login Route
router.post("/login", loginUser);

// Signup Route
router.post("/signup", signupUser);

module.exports = router;
