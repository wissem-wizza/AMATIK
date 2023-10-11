const express = require("express");
const PartSociale = require("../models/partSocialeModel");

const {
  getPartSociale,
  getPartSociales,
  getPartSocialesByEleveur,
} = require("../controllers/partSocialeController");
const { authenticated } = require("../middleware/authentication");
const {
  supervisorOnly,
  eleveurCreator,
  eleveurCreatorByModel
} = require("../middleware/authorization");

const router = express.Router();


router.get("/", authenticated, supervisorOnly, getPartSociales);
router.get("/eleveur/:id", authenticated, eleveurCreator, getPartSocialesByEleveur);

router.get("/:id", authenticated, eleveurCreatorByModel(PartSociale), getPartSociale);

module.exports = router;
