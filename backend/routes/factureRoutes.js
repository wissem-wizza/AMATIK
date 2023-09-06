const express = require("express");

const { getFacture, getFactures } = require("../controllers/factureController");

const router = express.Router();

const { protect } = require("../Middleware/authMiddleware");

//get all factures
router.get("/", protect, getFactures);
//get a single facture
router.get("/:id", protect, getFacture);

// router.post("/", protect, createFacture);
// router.patch("/:id", protect, updateFacture);
// router.delete("/:id", protect, deleteFacture);

// router.route('/').get(protect, ).post(protect, )
// router.route('/:id').delete(protect, delete).put(protect, update)

module.exports = router;
