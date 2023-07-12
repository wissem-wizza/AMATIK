const Annonce = require("../models/annonceModel");
const mongoose = require("mongoose");

//get all announces
const getAnnonces = async (req, res) => {
  const annonces = await Annonce.find({}).sort({ createdAt: -1 });

  res.status(200).json(annonces);
};

//get a single announce
const getAnnonce = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Aucune annonce ne correspond!" });
  }

  const annonce = await Annonce.find({ id });

  if (!annonce) {
    return res.status(400).json({ error: "Aucune annonce ne correspond!" });
  }

  res.status(200).json(annonce);
};

// create a new annonce
const createAnnonce = async (req, res) => {
  const { client_id, centre_ramassage, quantite_animeaux, nature, poids } =
    req.body;

  let emptyFields = [];

  if (!client_id) {
    emptyFields.push("id client");
  }
  if (!centre_ramassage) {
    emptyFields.push("centre de ramassage");
  }
  if (!quantite_animeaux) {
    emptyFields.push("quantité des animeaux");
  }
  if (!nature) {
    emptyFields.push("nature");
  }
  if (!poids) {
    emptyFields.push("poids");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Veuillez remplir tout les champs", emptyFields });
  }

  // add to the database
  try {
    const annonce = await Annonce.create({
      centre_ramassage,
      quantite_animeaux,
      nature,
      poids,
    });
    res.status(200).json(annonce);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete an announce
const deleteAnnonce = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Aucune annonce ne correspond!" });
  }

  const annonce = await Annonce.findOneAndDelete({ _id: id });

  if (!annonce) {
    return res.status(400).json({ error: "Aucune annonce ne correspond!" });
  }

  res.status(200).json(annonce);
};

//update an announce
const updateAnnonce = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Aucune annonce ne correspond!" });
  }

  const annonce = await Annonce.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!annonce) {
    return res.status(400).json({ error: "Aucune annonce ne correspond!" });
  }

  res.status(200).json(annonce);
};

module.exports = {
  getAnnonce,
  getAnnonces,
  createAnnonce,
  updateAnnonce,
  deleteAnnonce,
};
