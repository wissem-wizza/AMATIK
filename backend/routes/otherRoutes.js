const express = require("express");

const { getLabels, getNatures } = require("../controllers/otherControllers");
const { authenticated } = require("../middleware/authentication");
const { supervisorOnly } = require("../middleware/authorization");

const router = express.Router();

router.get("/label", authenticated, supervisorOnly, getLabels);
router.get("/nature", authenticated, getNatures);

module.exports = router;
