const express = require("express");

const { authenticated } = require("../middleware/authentication");

const {
    getAbattage,
    getAbattages,
    createAbattage,
    updateAbattage,
    deleteAbattage,
} = require("../controllers/abattageController");

const router = express.Router();

router.get("/", authenticated, getAbattages);
router.get("/:id", authenticated, getAbattage);

router.post("/", authenticated, createAbattage);
router.patch("/:id", authenticated, updateAbattage);
router.delete("/:id", authenticated, deleteAbattage);

module.exports = router;
