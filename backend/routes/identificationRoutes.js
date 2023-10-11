const express = require("express");

const {
    getIdentifications,
    getIdentificationsATransporter,
    getIdentificationsByRelatedTransport,
    getIdentificationsCheptel,
    createIdentification,
    updateIdentification,
    updateManyIdentifications,
} = require("../controllers/identificationController");
const { authenticated } = require("../middleware/authentication");

const router = express.Router();

router.get("/", authenticated, getIdentifications);
router.get("/a_transporter/", authenticated, getIdentificationsATransporter);
router.get("/transport/:id", authenticated, getIdentificationsByRelatedTransport);
router.get("/cheptel/", authenticated, getIdentificationsCheptel);

router.post("/", authenticated, createIdentification);
router.patch("/", authenticated, updateIdentification);
router.patch("/many", authenticated, updateManyIdentifications);

module.exports = router;
