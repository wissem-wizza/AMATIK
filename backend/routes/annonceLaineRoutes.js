const express = require("express");

const {
    getAnnoncesLaine,
    getAnnoncesLaineByEleveur,
    getAnnonceLaineSelectFields,
} = require("../controllers/annonceLaineController");
const { authenticated } = require("../middleware/authentication");
const {
    supervisorOnly,
    eleveurCreator,
} = require("../middleware/authorization");

const router = express.Router();


router.get("/", authenticated, supervisorOnly, getAnnoncesLaine);
router.get("/eleveur/:id", authenticated, eleveurCreator, getAnnoncesLaineByEleveur);
router.get("/select", authenticated, getAnnonceLaineSelectFields);

module.exports = router;
