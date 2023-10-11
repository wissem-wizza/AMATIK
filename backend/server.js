require("dotenv").config();

const express = require("express");
const connectDB = require("./config/DBConnect");
const { errorHandler } = require("./middleware/errorMiddleware");

const cors = require("cors");

const eleveurRoutes = require("./routes/eleveurRoutes");
const clientRoutes = require("./routes/clientRoutes");
const annonceRoutes = require("./routes/annonceRoutes");
const annonceLaineRoutes = require("./routes/annonceLaineRoutes");
const factureRoutes = require("./routes/factureRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const partSocialeRoutes = require("./routes/partSocialeRoutes");
const bonLivraisonRoutes = require("./routes/bonLivraisonRoutes");
const abattageRoutes = require("./routes/abattageRoutes");
const parametresDiversRoutes = require("./routes/parametresDiversRoutes");
const transportRoutes = require("./routes/transportRoutes");
const identificationRoutes = require("./routes/identificationRoutes");
const ristourneRoutes = require("./routes/ristourneRoutes");
const otherRoutes = require("./routes/otherRoutes");

const port = process.env.PORT || 4000;

connectDB();

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// app.use(
//   cors({
//     allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
//     exposedHeaders: ["authorization"], // you can change the headers
//     origin: "http://localhost:3000",
//     // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     // preflightContinue: false,
//   })
// );

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
app.use("/api", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/eleveur", eleveurRoutes);
app.use("/api/facture", factureRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/annonce", annonceRoutes);
app.use("/api/annonce_laine", annonceLaineRoutes);
app.use("/api/part_sociale", partSocialeRoutes);
app.use("/api/bon_livraison", bonLivraisonRoutes);
app.use("/api/abattage", abattageRoutes);
app.use("/api/parametres_divers", parametresDiversRoutes);
app.use("/api/transport", transportRoutes);
app.use("/api/identification", identificationRoutes);
app.use("/api/ristourne", ristourneRoutes);
app.use("/api/other", otherRoutes)
app.use(errorHandler);

//listen to port for requests
app.listen(port, () => console.log(`listening on port : ${port}`));
