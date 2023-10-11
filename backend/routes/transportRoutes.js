const express = require("express");

const {
  getTransport,
  getTransports,
  getTransportSelectFields,
  getTransportPlanifie,
  createTransport,
  updateTransport,
  deleteTransport,
} = require("../controllers/transportController");
const { authenticated } = require("../middleware/authentication");

const router = express.Router();

router.get("/", authenticated, getTransports);
router.get("/select", authenticated, getTransportSelectFields);
router.get("/planifie", authenticated, getTransportPlanifie);
router.get("/:id", authenticated, getTransport);

router.post("/", authenticated, createTransport);
router.patch("/:id", authenticated, updateTransport);
router.delete("/:id", authenticated, deleteTransport);

module.exports = router;
