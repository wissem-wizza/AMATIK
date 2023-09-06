const Eleveur = require("../models/eleveurModel");
const mongoose = require("mongoose");

//get all eleveurs
const getEleveurs = async (req, res) => {
  const eleveurs = await Eleveur.find({}); //.sort({ createdAt: -1 });

  res.status(200).json(eleveurs);
};

//get all eleveurs
const getEleveursName = async (req, res) => {
  const eleveurs = await Eleveur.find({}, { NOM: 1 }).sort({ NOM: 1 }); //.sort({ createdAt: -1 });
  names = eleveurs.map((eleveur) => eleveur.NOM);
  res.status(200).json(names);
};

//get a single eleveur
const getEleveur = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "id non valid!" });
  }
  const eleveur = await Eleveur.findOne({ _id: id });

  if (!eleveur) {
    return res.status(400).json({ error: "Aucun eleveur ne correspond!" });
  }

  res.status(200).json(eleveur);
};

// create a new eleveur
const createEleveur = async (req, res) => {
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
    const eleveur = await Eleveur.create({ ...req.body });
    res.status(200).json(eleveur);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete an eleveur
const deleteEleveur = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "l'id n'est pas valide!" });
  }

  const eleveur = await Eleveur.findOneAndDelete({ _id: id });

  if (!eleveur) {
    return res.status(400).json({ error: "Aucun eleveur ne correspond!" });
  }

  res.status(200).json(eleveur);
};

//update an eleveur
const updateEleveur = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Aucun eleveur ne correspond!" });
  }

  const eleveur = await Eleveur.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!eleveur) {
    return res.status(400).json({ error: "Aucun eleveur ne correspond!" });
  }

  res.status(200).json(eleveur);
};

module.exports = {
  getEleveur,
  getEleveurs,
  getEleveursName,
  createEleveur,
  updateEleveur,
  deleteEleveur,
};
