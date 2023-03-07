require("dotenv").config();

const express = require("express");
const connectDB = require("./config/DBConnect");

const annonceRoutes = require("./routes/annonceRoutes");
const userRoutes = require("./routes/userRoutes");

const port = process.env.PORT || 4000;

connectDB();

const app = express();

//parses requests to check the body "req.body"
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/annonces", annonceRoutes);
app.use("/api/user", userRoutes);

//listen to port for requests
app.listen(port, () => console.log(`listening on port : ${port}`));
