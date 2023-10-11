const mongoose = require("mongoose");
const Identification = require("../models/identificationModel");
const Annonce = require('../models/annonceModel')
const Transport = require('../models/transportModel')
const { identificationPipelineWithFilter } = require('../helpers/identificationHelper')

// @route   GET /api/identification
// @desc    get identification list
// @access  authenticated supervisor
const getIdentifications = async (req, res) => {
  try {
    const identifications = await Identification.find({});
    res.status(200).json(identifications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   GET /api/identification/a_transporter
// @desc    get identifications that are eligible for transport
// @access  authenticated supervisor
const getIdentificationsATransporter = async (req, res) => {

  try {
    const identifications = await Identification.aggregate(identificationPipelineWithFilter({
        dispoTransp: true,
    }));
    res.status(200).json(identifications)
} catch (error) {
    res.status(400).json({ error: error.message });
}
};

// @route   GET /api/identification/cheptel
// @desc    get identifications that are not sold
// @access  authenticated supervisor
const getIdentificationsCheptel = async (req, res) => {
try {
const identifications = await Identification.aggregate([
  {
    $match: {
      Vendu: { $eq: 0 },
    },
  },
  {
    $group: {
      _id: null,
      total_cheptel: { $sum: "$NB_MOUT" },
    },
  },
]);
res.status(200).json(identifications);
} catch (error) {
res.status(400).json({ error: error.message });
}
};

// @route   GET /api/identification/transport/:id
// @desc    get identifications by their linked transport's id
// @access  authenticated
const getIdentificationsByRelatedTransport = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "id non valid!" });
    }

    try {
        const transport = await Transport.findById(id);

        if (!transport) {
            return res.status(400).json({ error: "Aucun transport ne correspond!" });
        }

        const identifications = await Identification.aggregate(identificationPipelineWithFilter({
            TRANSPORT: transport.NUM_ORDRE,
        }));

        if (!identifications) {
            return res.status(400).json({ error: "Aucune identification ne correspond!" });
        }

        res.status(200).json(identifications);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @route   POST /api/identification
// @desc    create a new identification record
// @access  authenticated supervisor
const createIdentification = async (req, res) => {
    try {
        const identification = await Identification.create({ ...req.body });

    // for new "identification" record to be directly integrated in the DataGrid
    const annonce = await Annonce.findOne({
      NUM_ENREGIST: identification.NumAnnonce,
    });

    res.status(200).json({
      ...identification.toObject(),
      nom_eleveur: identification.NAISSEUR,
      NB_AGNAUX: annonce?.GROUPE?.OVINS?.AGNAUX?.TOTAL,
      NB_BELIERS: annonce?.GROUPE?.OVINS?.BELIERS?.TOTAL,
      NB_BREBIES: annonce?.GROUPE?.OVINS?.BREBIES?.TOTAL,
      NB_CHEVRES: annonce?.GROUPE?.CAPRINS?.NB_CHEVRES,
      NB_BOUCS: annonce?.GROUPE?.CAPRINS?.NB_BOUCS,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   PATCH /api/identification/:id
// @desc    update one "identification" record
// @access  authenticated supervisor
const updateIdentification = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "Aucun enregistrement ne correspond!" });
  }

  try {
    const identification = await Identification.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );

    if (!identification) {
      return res
        .status(400)
        .json({ error: "Aucun identification ne correspond!" });
    }

    res.status(200).json(identification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   PATCH /api/identification/many
// @desc    update many "identification" records at once
// @access  authenticated supervisor
const updateManyIdentifications = async (req, res) => {
  const { ids, modification } = req.body;

  // Ensure valid identification IDs
  const validIds = ids.filter((id) => mongoose.Types.ObjectId.isValid(id));
  if (validIds.length !== ids.length) {
    return res
      .status(400)
      .json({ error: "Invalid identification ID(s) provided." });
  }

  try {
    // Different approach for updating records one by one (too many interaction with DB !!)
    // const updatedIdentifications = await Promise.all(validIds.map(async id => {
    //     const updatedIdentification = await Identification.findOneAndUpdate(
    //         { _id: id },
    //         { ...modification },
    //         { new: true }
    //     );
    //     return updatedIdentification;
    // }));

        await Identification.updateMany(
            { _id: { $in: validIds } },
            { ...modification },
            { new: true }
            );
        const updatedIdentifications = await Identification.find({ _id: { $in: validIds } })

    res.status(200).json(updatedIdentifications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getIdentifications,
  getIdentificationsATransporter,
  getIdentificationsCheptel,
  getIdentificationsByRelatedTransport,
  createIdentification,
  updateIdentification,
  updateManyIdentifications,
};
