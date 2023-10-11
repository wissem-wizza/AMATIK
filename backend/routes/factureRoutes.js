const express = require("express");

const { getFacture, getFactures, getFactureSelectFields } = require("../controllers/factureController");
const { authenticated } = require("../middleware/authentication");
const { supervisorOnly } = require("../middleware/authorization");

const router = express.Router();

router.get("/", authenticated, supervisorOnly, getFactures);
router.get("/select", authenticated, supervisorOnly, getFactureSelectFields);
router.get("/:id", authenticated, supervisorOnly, getFacture);

module.exports = router;
