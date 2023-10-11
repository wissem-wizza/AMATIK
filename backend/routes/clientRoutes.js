const express = require("express");

const {
  getClient,
  getCiviliteClients,
  getClients,
  getTotalClients,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");
const { authenticated } = require("../middleware/authentication");

const router = express.Router();

router.get("/", authenticated, getClients);
router.get("/civilite", authenticated, getCiviliteClients);
router.get("/total", authenticated, getTotalClients);
router.get("/:id", authenticated, getClient);

router.post("/", authenticated, createClient);
router.patch("/:id", authenticated, updateClient);
router.delete("/:id", authenticated, deleteClient);

module.exports = router;
