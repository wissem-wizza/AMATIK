const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
  //{_id:_id}
};

const loginUser = async (req, res) => {
  const { EMAIL, PASSWORD } = req.body;
  try {
    const user = await User.login(EMAIL, PASSWORD);
    // create a token
    const token = createToken(user._id);

    res.status(200).json({ EMAIL, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// we no need signup in our our project, we juste need createUser (CRUD)
const signupUser = async (req, res) => {
  const { EMAIL, PASSWORD } = req.body;
  try {
    const user = await User.signup(EMAIL, PASSWORD);
    // create a token
    const token = createToken(user._id);
    res.status(200).json({ EMAIL, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
