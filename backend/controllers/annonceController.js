const Annonce = require("../models/annonceModel");
const mongoose = require("mongoose");

//get parametrized annonces const annonces = await Annonces.aggregate([
const getAnnonces = async (req, res) => {
  const ParamDateDebut = req.query.DATE_D;
  const ParamDateFin = req.query.DATE_F;
  const ParamCle = req.query.CLE;
  const ParamRace = req.query.RACE;
  // console.log("BACK : ",req.query)
  const annonces = await Annonce.aggregate([
    {
      $match: {
        DATE_ANNONCE: {
          $gte: new Date(ParamDateDebut),
          $lte: new Date(ParamDateFin),
        },
        CLE: ParamCle,
        RACE: ParamRace,
      },
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
        MOYEN: "$MOYEN",
        NOM_A: "$NOM",
        NUM_ENREGIST: "$NUM_ENREGIST",
        DATE_ANNONCE: "$DATE_ANNONCE",
        DATE_ANNONCE: {
          $dateToString: {
            format: "%d-%m-%Y",
            date: "$DATE_ANNONCE",
          },
        },
        AGENT: "$AGENT",
        RACE: "$RACE",
        ADRESSE: "$eleveur_data.ADRESSES",
        CLE: "$eleveur_data.CLE",
        DESIGNATION: "$site_data.DESIGNATION",
      },
    },
  ]);

  res.status(200).json(annonces);
};

//get all annonces
// const getAnnonces = async (req, res) => {
//   const annonces = await Annonce.find({}); //.sort({ createdAt: -1 });
//   res.status(200).json(annonces);
// };

//get a single annonce
const getAnnonce = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "id non valid!" });
  }
  const annonce = await Annonce.findOne({ _id: id });

  if (!annonce) {
    return res.status(400).json({ error: "Aucun annonce ne correspond!" });
  }

  res.status(200).json(annonce);
};

// create a new annonce
const createAnnonce = async (req, res) => {
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
    const annonce = await Annonce.create({ ...req.body });
    res.status(200).json(annonce);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete an annonce
const deleteAnnonce = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "l'id n'est pas valide!" });
  }

  const annonce = await Annonce.findOneAndDelete({ _id: id });

  if (!annonce) {
    return res.status(400).json({ error: "Aucun annonce ne correspond!" });
  }

  res.status(200).json(annonce);
};

//update an annonce
const updateAnnonce = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Aucun annonce ne correspond!" });
  }

  const annonce = await Annonce.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!annonce) {
    return res.status(400).json({ error: "Aucun annonce ne correspond!" });
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
