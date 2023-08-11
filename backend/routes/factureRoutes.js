const express = require("express");

const { getFacture, getFactures } = require("../controllers/factureController");

const router = express.Router();

//get all factures
router.get("/", getFactures);
//get a single facture
router.get("/:id", getFacture);

// router.post("/", createFacture);
// router.patch("/:id", updateFacture);
// router.delete("/:id", deleteFacture);

// router.route('/').get(protect, ).post(protect, )
// router.route('/:id').delete(protect, delete).put(protect, update)

module.exports = router;
