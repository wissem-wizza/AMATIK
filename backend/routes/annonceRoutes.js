const express = require("express");
const Annonce = require("../models/annonceModel");

const {
  getAnnonce,
  getAnnonces,
  getAnnonceByEtat,
  getAnnonceStatistics,
  getAnnoncesByEleveur,
  createAnnonce,
  updateAnnonce,
  deleteAnnonce,
  getAnnonceSelectFields,
} = require("../controllers/annonceController");
const { authenticated } = require("../middleware/authentication");
const {
  supervisorOnly,
  eleveurCreator,
  eleveurCreatorByModel,
} = require("../middleware/authorization");

const router = express.Router();

router.get("/", authenticated, supervisorOnly, getAnnonces);
router.get("/eleveur/:id", authenticated, eleveurCreator, getAnnoncesByEleveur);
router.get("/select", authenticated, getAnnonceSelectFields);
router.get("/statistics", authenticated, getAnnonceStatistics);
router.get("/etat", authenticated, getAnnonceByEtat);
router.get("/:id", authenticated, eleveurCreatorByModel(Annonce), getAnnonce);

router.post("/", authenticated, createAnnonce);
router.patch(
  "/:id",
  authenticated,
  eleveurCreatorByModel(Annonce),
  updateAnnonce
);
router.delete(
  "/:id",
  authenticated,
  eleveurCreatorByModel(Annonce),
  deleteAnnonce
);

module.exports = router;
