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

//get all clients
router.get("/", getClients);
//get all clients
router.get("/civilite", getCiviliteClients);
//get a single client
router.get("/:id", getClient);

router.post("/", createClient);
router.patch("/:id", updateClient);
router.delete("/:id", deleteClient);

// router.route('/').get(protect, ).post(protect, )
// router.route('/:id').delete(protect, delete).put(protect, update)

module.exports = router;
