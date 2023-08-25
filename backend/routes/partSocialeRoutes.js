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

//get all partSociales
router.get("/", getPartSociales);

// //get all partSociales
// router.get("/civilite", getCivilitePartSociales);

//get a single partSociale
router.get("/:id", getPartSociale);

router.post("/", createPartSociale);
router.patch("/:id", updatePartSociale);
router.delete("/:id", deletePartSociale);

// router.route('/').get(protect, ).post(protect, )
// router.route('/:id').delete(protect, delete).put(protect, update)

module.exports = router;
