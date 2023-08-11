require("dotenv").config();

const express = require("express");
const connectDB = require("./config/DBConnect");

const cors = require("cors");

const eleveurRoutes = require("./routes/eleveurRoutes");
const clientRoutes = require("./routes/clientRoutes");
const annonceRoutes = require("./routes/annonceRoutes");
const factureRoutes = require("./routes/factureRoutes");
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
app.use(express.urlencoded({ extended: true }));

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
app.use("/api/facture", factureRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/annonce", annonceRoutes);
app.use("/api/user", userRoutes);

//listen to port for requests
app.listen(port, () => console.log(`listening on port : ${port}`));
