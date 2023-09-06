const express = require("express");

const { loginUser, signupUser } = require("../controllers/userController");

const router = express.Router();

const { protect } = require("../Middleware/authMiddleware");

//Login route
router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

// router.get("/me", protect, getMe);

module.exports = router;
