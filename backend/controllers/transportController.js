const mongoose = require("mongoose");
const Transport = require("../models/transportModel");
const { transportPipeline } = require('../helpers/transportHelpers') 
const { Site } = require("../models/otherModels")


const filterUniqueLabels = (arr) => {
  const uniqueLabels = {};
  return arr.filter((obj) =>
    obj.value !== "" && !uniqueLabels.hasOwnProperty(obj.value)
      ? (uniqueLabels[obj.value] = true)
      : false
  );
};

// @route   GET /api/transport
// @desc    get transport list
// @access  authenticated supervisor
const getTransports = async (req, res) => {
  try {
    const transports = await Transport.aggregate(transportPipeline(
      {
        DATE_TRANS: {
          $ne: null,
        }
      }
    ));

    res.status(200).json(transports);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   GET /api/transport/:id
// @desc    get one transport record
// @access  authenticated supervisor
const getTransport = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "id non valide!" });
  }

  try {
    const transport = await Transport.findById(id);

    if (!transport) {
      return res.status(400).json({ error: "Aucun transport ne correspond!" });
    }

    res.status(200).json(transport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   GET /api/transport/planifie
// @desc    get list of "transport planifié"
// @access  authenticated supervisor
const getTransportPlanifie = async (req, res) => {
  try {
    const transportCount = await Transport.countDocuments({
      ETAT_TRANSFERT: 0,
    });

    if (!transportCount) {
      return res.status(400).json({ error: "Aucun transport ne correspond!" });
    }
    res.status(200).json(transportCount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   GET /api/transport/select
// @desc    get list of different topics to serve as select options in transport form
// @access  authenticated supervisor
const getTransportSelectFields = async (req, res) => {
  try {
    // only sites that belong to AMATIK
    const DESIGNATION = (
      await Site.find(
        { CODE_SITE: { $in: [2, 4, 5, 7, 91, 11] } },
        { DESIGNATION: 1, CODE_SITE: 1 }
      )
    ).map((item) => ({ label: item.DESIGNATION, id: item.CODE_SITE }));
    const IMMATRICULATION = (
      await Transport.find({}).distinct("IMMATRICULATION")
    ).map((imm) => ({ value: imm.trim(), id: imm._id }));
    const CHAUFFEUR = (await Transport.find({}).distinct("CHAUFFEUR")).map(
      (chauffeur) => ({ value: chauffeur.trim(), id: chauffeur._id })
    );

    res.status(200).json({
      DESIGNATION,
      IMMATRICULATION: filterUniqueLabels(IMMATRICULATION), // no trim in mongodb -> no real distinct
      CHAUFFEUR: filterUniqueLabels(CHAUFFEUR),
    });
  } catch (error) {
    // catching on multiple await statements
    res.status(400).json({ error: error.message });
  }
};

// @route   POST /api/transport
// @desc    create a new transport record
// @access  authenticated supervisor
const createTransport = async (req, res) => {
  try {

    await Transport.create({ ...req.body });
    const newTransport = await Transport.aggregate(transportPipeline({
      NUM_ORDRE: req.body.NUM_ORDRE
    }))
    
    res.status(200).json(newTransport[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   DELETE /api/transport/:id
// @desc    delete one transport record
// @access  authenticated supervisor
const deleteTransport = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "l'id n'est pas valide!" });
  }

  try {
    const transport = await Transport.findOneAndDelete({ _id: id });

    if (!transport) {
      return res.status(400).json({ error: "Aucun transport ne correspond!" });
    }

    res.status(200).json(transport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   PATCH /api/transport/:id
// @desc    update one transport record
// @access  authenticated supervisor
const updateTransport = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Aucun transport ne correspond!" });
  }

  try {
    const transport = await Transport.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );

    if (!transport) {
      return res.status(400).json({ error: "Aucun transport ne correspond!" });
    }

    res.status(200).json(transport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTransports,
  getTransport,
  getTransportSelectFields,
  getTransportPlanifie,
  createTransport,
  updateTransport,
  deleteTransport,
};
