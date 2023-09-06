const express = require("express");

const {
  getEleveur,
  getEleveurs,
  getEleveursName,
  createEleveur,
  updateEleveur,
  deleteEleveur,
} = require("../controllers/eleveurController");

const router = express.Router();

const { protect } = require("../Middleware/authMiddleware");

//get all eleveurs
router.get("/", protect, getEleveurs);
router.get("/name", protect, getEleveursName);
//get a single eleveur
router.get("/:id", protect, getEleveur);

router.post("/", protect, createEleveur);
router.patch("/:id", protect, updateEleveur);
router.delete("/:id", protect, deleteEleveur);

// router.route('/').get(protect, ).post(protect, )
// router.route('/:id').delete(protect, delete).put(protect, update)

module.exports = router;
