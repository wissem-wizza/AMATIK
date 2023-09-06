const express = require("express");

const {
  getAnnonce,
  getAnnonces,
  createAnnonce,
  updateAnnonce,
  deleteAnnonce,
} = require("../controllers/annonceController");

const router = express.Router();

const { protect } = require("../Middleware/authMiddleware");

//get all announces
router.get("/", protect, getAnnonces);
//get a single announce
router.get("/:id", protect, getAnnonce);

router.post("/", protect, createAnnonce);
router.patch("/:id", protect, updateAnnonce);
router.delete("/:id", protect, deleteAnnonce);

// router.route('/').get(protect, ).post(protect, )
// router.route('/:id').delete(protect, delete).put(protect, update)

module.exports = router;
