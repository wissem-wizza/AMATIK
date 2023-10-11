const express = require("express");
const BonLivraison = require("../models/bonLivraisonModel");

const {
    getBonLivraison,
    getBonLivraisons,
    // getBonLivraisonsByEleveur,
    getBonLivraisonSelectFields,
} = require("../controllers/bonLivraisonController");
const { authenticated } = require("../middleware/authentication");
const {
    supervisorOnly,
    // eleveurCreator,
} = require("../middleware/authorization");

const router = express.Router();


router.get("/", authenticated, supervisorOnly, getBonLivraisons);
// router.get("/eleveur/:id", authenticated, eleveurCreator, getBonLivraisonsByEleveur);
router.get("/select", authenticated, supervisorOnly, getBonLivraisonSelectFields);

router.get("/:id", authenticated, supervisorOnly, getBonLivraison);

module.exports = router;
