const Client = require("../models/clientModel");
const mongoose = require("mongoose");

//get all clients
const getClients = async (req, res) => {
  const clients = await Client.find({}); //.sort({ createdAt: -1 });

  res.status(200).json(clients);
};

//get client + civilite
const getCiviliteClients = async (req, res) => {
  const clients = await Client.aggregate([
    {
      $lookup: {
        from: "labelle",
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
        ADR0: 1,
        ADR2: 1,
        ADRLIV1: 1,
        DATE_DERNIERE_FACTURE: 1,
        TELEP: 1,
        FAX: 1,
        portable: 1,
        ACTIF: 1,
        "libelles.libelle": 1,
      },
    },
  ]); //.sort({ createdAt: -1 });
  res.status(200).json(clients);
};

//get a single client
const getClient = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "id non valid!" });
  }

  const client = await Client.findOne({ _id: id });

  if (!client) {
    return res.status(400).json({ error: "Aucun client ne correspond!" });
  }

  res.status(200).json(client);
};

// create a new client
const createClient = async (req, res) => {
  console.log(req.body);

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

// delete an client
const deleteClient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "l'id n'est pas valide!" });
  }

  const client = await Client.findOneAndDelete({ _id: id });

  if (!client) {
    return res.status(400).json({ error: "Aucun client ne correspond!" });
  }

  res.status(200).json(client);
};

//update an client
const updateClient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Aucun client ne correspond!" });
  }

  const client = await Client.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!client) {
    return res.status(400).json({ error: "Aucun client ne correspond!" });
  }

  res.status(200).json(client);
};

module.exports = {
  getClients,
  getCiviliteClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
};
