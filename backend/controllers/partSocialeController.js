const PartSociale = require("../models/partSocialeModel");
const mongoose = require("mongoose");

const filteredPipeline = (filter = {}) => [
  {
    $match: {
      ...filter
    }
  },
  {
    $lookup: {
      from: 'facture',
      localField: 'facture_id',
      foreignField: '_id',
      as: 'factureData'
    }
  },
  {
    $unwind: {
      path: '$factureData',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $lookup: {
      from: 'eleveur',
      localField: 'eleveur_id',
      foreignField: '_id',
      as: 'eleveurData'
    }
  },
  {
    $unwind: {
      path: '$eleveurData',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $project: {
      eleveur_id: 1,
      datop: 1,
      base_HT: 1,
      preleve: 1,
      souscrit: 1,
      comfou: 1,
      GROUPEMENT: 1,
      facture_id: 1,
      'factureData.NUMFAC': 1,
      'eleveurData.NOM': 1
    }
  },
  {
    $sort: {
      datop: 1,
      facture_id: 1
    },
  },
  // { $limit: 25 }, // get rid of it later...
]

// @route   GET /api/part_sociale
// @desc    get "part_sociale" list (filtered if requested by eleveur)
// @access  authenticated supervisor (or eleveur if eligible)
const getPartSociales = async (req, res) => {
  try {
    const partSociales = await PartSociale.aggregate(filteredPipeline());
    res.status(200).json(partSociales);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

// @route   GET /api/part_sociale/:id
// @desc    get one "part_sociale" record
// @access  authenticated supervisor (or eleveur if eligible)
const getPartSociale = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "id non valide!" });
  }

  try {
    const partSociale = await PartSociale.findById(id);
  
    if (!partSociale) {
      return res.status(400).json({ error: "Aucune part sociale ne correspond!" });
    }
  
    res.status(200).json(partSociale);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

// @route   GET /api/part_sociale/eleveur/:id
// @desc    get part sociale list created by one eleveur
// @access  authenticated supervisor or eleveur creator of part sociale
const getPartSocialesByEleveur = async (req, res) => {

  const { id: eleveur_id } = req.params

  if (!mongoose.Types.ObjectId.isValid(eleveur_id)) {
    return res.status(404).json({ error: "id non valid!" });
  }

  try {
    const partSociales = await PartSociale.aggregate(filteredPipeline({
      eleveur_id: mongoose.Types.ObjectId(eleveur_id)
    })).sort({ datop: -1 })

    if (!partSociales) {
      return res.status(400).json({ error: "Aucune part sociale ne correspond!" });
    }

    res.status(200).json(partSociales)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPartSociales,
  getPartSociale,
  getPartSocialesByEleveur,
};
