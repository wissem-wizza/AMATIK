const express = require("express");

const {
  getEleveur,
  getEleveurs,
  createEleveur,
  updateEleveur,
  deleteEleveur,
} = require("../controllers/eleveurController");

const router = express.Router();

//get all eleveurs
router.get("/", getEleveurs);
//get a single eleveur
router.get("/:id", getEleveur);

router.post("/", createEleveur);
router.patch("/:id", updateEleveur);
router.delete("/:id", deleteEleveur);

// router.route('/').get(protect, ).post(protect, )
// router.route('/:id').delete(protect, delete).put(protect, update)

module.exports = router;
