const Client = require("../models/clientModel");
const mongoose = require("mongoose");

// @route   GET /api/client
// @desc    get client list
// @access  authenticated supervisor
const getClients = async (req, res) => {
  try {
    const clients = await Client.find({}); //.sort({ createdAt: -1 });

    res.status(200).json(clients);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   GET /api/client/total
// @desc    get total client
// @access  authenticated supervisor
const getTotalClients = async (req, res) => {
  try {
    const clients = await Client.count({}); //.sort({ createdAt: -1 });

    res.status(200).json(clients);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   GET /api/client/civilite
// @desc    get client + civilite
// @access  authenticated supervisor
const getCiviliteClients = async (req, res) => {
  try {
    const clients = await Client.aggregate([
      {
        $lookup: {
          from: "label",
          let: { teteValue: "$TETE" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$code", "$$teteValue"] },
                    { $eq: ["$type", 31] },
                  ],
                },
              },
            },
          ],
          as: "libelles",
        },
      },
      {
        $project: {
          _id: 1,
          CLE: 1,
          NOM: 1,
          ADR: ["$ADR0", "$ADR1", "$ADR2"],
          ADRLIV: ["$ADRLIV0", "$ADRLIV1", "$ADRLIV2"],
          DATE_DERNIERE_FACTURE: 1,
          TELEP: 1,
          FAX: 1,
          portable: 1,
          ACTIF: 1,
          "libelles.libelle": 1,
        },
      },
      {
        $sort: {
          DATE_DERNIERE_FACTURE: -1,
        },
      },
    ]); //.sort({ createdAt: -1 });
    res.status(200).json(clients);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   GET /api/client/:id
// @desc    get one client record
// @access  authenticated supervisor
const getClient = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "id non valid!" });
  }

  try {
    const client = await Client.findById(id);

    if (!client) {
      return res.status(400).json({ error: "Aucun client ne correspond!" });
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   POST /api/client
// @desc    create a new client record
// @access  authenticated supervisor
const createClient = async (req, res) => {
  // let emptyFields = [];
  // if (!client_id) {
  //   emptyFields.push("id client");
  // }
  // if (emptyFields.length > 0) {
  //   return res
  //     .status(400)
  //     .json({ error: "Veuillez remplir les champs manquants", emptyFields });
  // }

  // add to the database
  try {
    const client = await Client.create({ ...req.body });
    res.status(200).json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   DELETE /api/client/:id
// @desc    delete one client record
// @access  authenticated supervisor
const deleteClient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "l'id n'est pas valide!" });
  }

  try {
    const client = await Client.findOneAndDelete({ _id: id });

    if (!client) {
      return res.status(400).json({ error: "Aucun client ne correspond!" });
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   PATCH /api/client/:id
// @desc    update one client record
// @access  authenticated supervisor
const updateClient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Aucun client ne correspond!" });
  }

  try {
    const client = await Client.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );

    if (!client) {
      return res.status(400).json({ error: "Aucun client ne correspond!" });
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getClients,
  getTotalClients,
  getCiviliteClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
};
