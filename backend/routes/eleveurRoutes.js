const express = require("express");

const {
  getEleveur,
  getEleveurs,
  getEleveursName,
  getTotalEleveur,
  isCLEandEmailMatch,
  createEleveur,
  updateEleveur,
  deleteEleveur,
} = require("../controllers/eleveurController");
const { authenticated } = require("../middleware/authentication");

const router = express.Router();

router.get("/", authenticated, getEleveurs);
router.get("/name", authenticated, getEleveursName);
router.get("/total", authenticated, getTotalEleveur);
router.get("/:id", authenticated, getEleveur);

router.post("/match", isCLEandEmailMatch);
router.post("/", authenticated, createEleveur);
router.patch("/:id", authenticated, updateEleveur);
router.delete("/:id", authenticated, deleteEleveur);

module.exports = router;
