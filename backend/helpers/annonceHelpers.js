const Annonce = require("../models/annonceModel");
const mongoose = require("mongoose");

const pipelineWithRaceFilter = (raceFilter) => [
    {
        $match: {
            RACE: raceFilter
        }
    },
    {
        $lookup: {
            from: "eleveur",
            localField: "CLE",
            foreignField: "CLE",
            as: "eleveur_data",
        },
    },
    { $unwind: "$eleveur_data" },
    {
        $lookup: {
            from: "site",
            localField: "eleveur_data.CODE_SITE",
            foreignField: "CODE_SITE",
            as: "site_data",
        },
    },
    { $unwind: { path: "$site_data", preserveNullAndEmptyArrays: true } },
    {
        $project: {
            MOYEN: 1,
            NOM: 1,
            NUM_ENREGIST: 1,
            DATE_ANNONCE: 1,
            AGENT: 1,
            RACE: 1,
            ADRESSE: "$eleveur_data.ADRESSES",
            CLE: "$eleveur_data.CLE",
            DESIGNATION: "$site_data.DESIGNATION",
            TYPE: 1,
            GROUPE: 1,
            EtatAnnonce: 1,
        },
    },
    { $sort: { DATE_ANNONCE: -1 } },
    // { $limit: 5 }, // get rid of it later...
]

const annoncesByEleveurWithRaceFilter = async (req, res, filter) => {
  const e_id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(e_id)) {
    return res.status(404).json({ error: "id non valid!" });
  }

  try {
    const annonces = await Annonce.find({ eleveur_id: e_id, ...filter }).sort({
      NUM_ENREGIST: -1,
    });

    if (!annonces) {
      return res.status(400).json({ error: "Aucune annonce ne correspond!" });
    }
    res.status(200).json(annonces);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const AnnonceCategoryByMonth = () => [
  {
    $match: {
      RACE: { $in: ["OVINS", "CAPRINS", "BOVINS", "LAINE"] },
      DATE: { $gte: "2022-11-01", $lt: "2023-11-01" }, // Filter for the year 2023
    },
  },
  {
    $addFields: {
      month: {
        $month: {
          $dateFromString: { dateString: "$DATE", format: "%Y-%m-%d" },
        },
      },
    },
  },
  {
    $group: {
      _id: { month: "$month", RACE: "$RACE" },
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      month: "$_id.month",
      RACE: "$_id.RACE",
      count: 1,
      _id: 0,
    },
  },
  {
    $sort: {
      month: 1,
      RACE: 1,
    },
  },
];

const lastMonth = new Date();
lastMonth.setDate(lastMonth.getDate() - 30);
var formattedDate = lastMonth.toISOString().slice(0, 10);
const AnnonceByEtat = () => [
  {
    $match: {
      DATE: { $gte: formattedDate },
    },
  },
  {
    $group: {
      _id: "$EtatAnnonce",
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      EtatAnnonce: "$_id",
      count: 1,
    },
  },
  {
    $group: {
      _id: null,
      en_cours: {
        $sum: { $cond: [{ $eq: ["$EtatAnnonce", "en cours"] }, "$count", 0] },
      },
      Rejete: {
        $sum: { $cond: [{ $eq: ["$EtatAnnonce", "Rejeté"] }, "$count", 0] },
      },
      valide: {
        $sum: { $cond: [{ $eq: ["$EtatAnnonce", "validé"] }, "$count", 0] },
      },
    },
  },
  {
    $project: {
      _id: 0,
      en_cours: 1,
      Rejete: 1,
      valide: 1,
    },
  },
];

module.exports = {
  pipelineWithRaceFilter,
  annoncesByEleveurWithRaceFilter,
  AnnonceCategoryByMonth,
  AnnonceByEtat,
};
