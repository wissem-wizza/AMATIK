const express = require("express");
const Ristourne = require('../models/ristourneModel')

const {
    getRistournes,
    getRistourne,
    getRistournesByEleveur
} = require("../controllers/ristourneController");
const { authenticated } = require("../middleware/authentication");
const {
    supervisorOnly,
    eleveurCreator,
    eleveurCreatorByModel,
} = require("../middleware/authorization");

const router = express.Router();

router.get("/", authenticated, supervisorOnly, getRistournes);
router.get("/eleveur/:id", authenticated, eleveurCreator, getRistournesByEleveur);
router.get("/:id", authenticated, eleveurCreatorByModel(Ristourne), getRistourne);

module.exports = router;
