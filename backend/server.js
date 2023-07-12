require("dotenv").config();

const express = require("express");
const connectDB = require("./config/DBConnect");

const cors = require("cors");

const eleveurRoutes = require("./routes/eleveurRoutes");
const annonceRoutes = require("./routes/annonceRoutes");
const userRoutes = require("./routes/userRoutes");

const port = process.env.PORT || 4000;

connectDB();

const app = express();

app.use(
  cors({
    // allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    // exposedHeaders: ["authorization"], // you can change the headers
    origin: "*",
    // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // preflightContinue: false,
  })
);

//parses requests to check the body "req.body"
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  // setTimeout(() => {
  //   const error = new Error("Request Timeout");
  //   error.status = 408;
  //   next(error);
  // }, 5000); // set timeout to 5 seconds
  next();
  // next();
});

//routes
app.use("/api/eleveur", eleveurRoutes);
app.use("/api/annonces", annonceRoutes);
app.use("/api/user", userRoutes);

//listen to port for requests
app.listen(port, () => console.log(`listening on port : ${port}`));
