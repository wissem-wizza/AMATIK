const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authenticated = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      if (!token) {
        res.status(401).send({ error: "Not authorized, no token!" });
      }

      // Verify token .. like a promise (catched if no valid token)
      const decoded = jwt.verify(token, process.env.SECRET);

      // Get user from the database ... but it's already in the token
      // req.user = await User.findOne({EMAIL: decoded.email}).select("-PASSWORD");
      const { email, nom, type, eleveur_id, cle, _id } = decoded;
      req.user = { email, nom, type, eleveur_id, cle, _id };

      next();
    } catch (error) {
      res.status(401).send({ error: "Not authorized, Invalid token!" });
    }
  } else {
    res.status(401).send({ error: "Not authorized!" });
  }
});

module.exports = { authenticated };
