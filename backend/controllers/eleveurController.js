const crypto = require("crypto");
const mongoose = require("mongoose");
const Eleveur = require("../models/eleveurModel");
const User = require("../models/userModel");

// @route   GET /api/eleveur?fields=field1,field2,field3...
// @desc    get eleveur list with suggested fields or all fields if no query string
// @access  authenticated supervisor
const getEleveurs = async (req, res) => {
  let fieldsToReturn = req.query.fields?.split(",");

  if (fieldsToReturn) {
    fieldsToReturn = fieldsToReturn.filter((field) => {
      return field.length > 0;
    });

    if (fieldsToReturn.length > 0) {
      const projection = fieldsToReturn.reduce((obj, field) => {
        obj[field] = 1;
        return obj;
      }, {});

      try {
        const eleveurs = await Eleveur.find({}, projection);
        res.status(200).json(eleveurs);
      } catch (error) {
        console.log("eleveur query error", error);
      }
    }
  } else {
    try {
      const eleveurs = await Eleveur.find({});
      res.status(200).json(eleveurs);
    } catch (error) {
      console.log("eleveur query error", error);
    }
  }
};

// @route   GET /api/eleveur/name
// @desc    get eleveur name list
// @access  authenticated supervisor
const getEleveursName = async (req, res) => {
  try {
    const eleveurs = await Eleveur.find({}, { NOM: 1 }).sort({ NOM: 1 }); //.sort({ createdAt: -1 });
    names = eleveurs.map((eleveur) => eleveur.NOM);
    res.status(200).json(names);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   GET /api/eleveur/total
// @desc    get total eleveur
// @access  authenticated supervisor
const getTotalEleveur = async (req, res) => {
  try {
    const eleveurs = await Eleveur.count({}); //.sort({ createdAt: -1 });
    res.status(200).json(eleveurs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   GET /api/eleveur/:id
// @desc    get one eleveur record
// @access  authenticated supervisor
const getEleveur = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "id non valid!" });
  }
  try {
    const eleveur = await Eleveur.findById(id);

    if (!eleveur) {
      return res.status(400).json({ error: "Aucun eleveur ne correspond!" });
    }

    res.status(200).json(eleveur);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   POST /api/eleveur/match
// @desc    get matching email and CLE
// @access  Public
const isCLEandEmailMatch = async (req, res) => {
  const { CLE, EMAIL } = req.body;
  try {
    const record = await Eleveur.findOne({ EMAIL, CLE });
    if (record !== null) {
      const data = JSON.stringify({
        currentTime: new Date(),
        user: EMAIL,
        secret: process.env.SECRET,
      });
      const RESET_CODE = crypto.createHash("sha256").update(data).digest("hex");
      await User.findOneAndUpdate(
        { EMAIL },
        {
          RESET_CODE,
        },
        { new: true }
      );
      res.status(200).json({ isMatched: true, _id: record._id, RESET_CODE });
    } else {
      res.status(200).json({ isMatched: false });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   POST /api/eleveur
// @desc    create a new eleveur record
// @access  authenticated supervisor
const createEleveur = async (req, res) => {
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

// @route   DELETE /api/eleveur/:id
// @desc    delete one eleveur record
// @access  authenticated supervisor
const deleteEleveur = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "l'id n'est pas valide!" });
  }

  try {
    const eleveur = await Eleveur.findOneAndDelete({ _id: id });

    if (!eleveur) {
      return res.status(400).json({ error: "Aucun eleveur ne correspond!" });
    }

    res.status(200).json(eleveur);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   PATCH /api/eleveur/:id
// @desc    update one eleveur record
// @access  authenticated supervisor
const updateEleveur = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Aucun eleveur ne correspond!" });
  }

  try {
    const eleveur = await Eleveur.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );

    if (!eleveur) {
      return res.status(400).json({ error: "Aucun eleveur ne correspond!" });
    }

    res.status(200).json(eleveur);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getEleveur,
  getEleveurs,
  getTotalEleveur,
  getEleveursName,
  isCLEandEmailMatch,
  createEleveur,
  updateEleveur,
  deleteEleveur,
};
