const express = require("express");

const {
  getClient,
  getCiviliteClients,
  getClients,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");

const router = express.Router();

const { protect } = require("../Middleware/authMiddleware");

//get all clients
router.get("/", protect, getClients);
//get all clients
router.get("/civilite", protect, getCiviliteClients);
//get a single client
router.get("/:id", protect, getClient);

router.post("/", protect, createClient);
router.patch("/:id", protect, updateClient);
router.delete("/:id", protect, deleteClient);

// router.route('/').get(protect, ).post(protect, )
// router.route('/:id').delete(protect, delete).put(protect, update)

module.exports = router;
