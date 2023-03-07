const express = require("express");

const {
  getAnnonce,
  getAnnonces,
  createAnnonce,
  updateAnnonce,
  deleteAnnonce,
} = require("../controllers/annonceController");

const router = express.Router();

//get all announces
router.get("/", getAnnonces);
//get a single announce
router.get("/:id", getAnnonce);

router.post("/", createAnnonce);
router.patch("/:id", updateAnnonce);
router.delete("/:id", deleteAnnonce);

// router.route('/').get(protect, ).post(protect, )
// router.route('/:id').delete(protect, delete).put(protect, update)

module.exports = router;
