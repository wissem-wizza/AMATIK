const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign({ ...user }, process.env.SECRET, { expiresIn: "1d" });
  //{_id:_id}
};

// @route   POST /api/login
// @desc    login request
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login({email, password});
    // create a token
    const token = createToken(user);

    res.status(200).json({ ...user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   POST /api/signup
// @desc    signup request
// @access  Public
const signupUser = async (req, res) => {
  console.log("body", req.body)
  const { email, password, type, nom } = req.body;
  console.log("content", email, password, type, nom)
  try {
    const user = await User.signup({email, password, type, nom});

    res.status(200).json({ ...user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
