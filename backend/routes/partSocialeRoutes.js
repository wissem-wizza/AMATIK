const express = require("express");

const {
  getPartSociale,
  //   getCivilitePartSociales,
  getPartSociales,
  createPartSociale,
  updatePartSociale,
  deletePartSociale,
} = require("../controllers/partSocialeController");

const router = express.Router();

const { protect } = require("../Middleware/authMiddleware");

//get all partSociales
router.get("/", protect, getPartSociales);

// //get all partSociales
// router.get("/civilite", getCivilitePartSociales);

//get a single partSociale
router.get("/:id", protect, getPartSociale);

router.post("/", protect, createPartSociale);
router.patch("/:id", protect, updatePartSociale);
router.delete("/:id", protect, deletePartSociale);

// router.route('/').get(protect, ).post(protect, )
// router.route('/:id').delete(protect, delete).put(protect, update)

module.exports = router;
