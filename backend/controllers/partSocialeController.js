const PartSociale = require("../models/partSocialeModel");
const mongoose = require("mongoose");

//get all partSociales
// const getPartSociales = async (req, res) => {
//   // const eleveur_id = req.params.eleveur_id
//   const partSociales = await PartSociale.find({}); //.sort({ createdAt: -1 });

//   res.status(200).json(partSociales);
// };

//get partSociale + libelle
const getPartSociales = async (req, res) => {
  const partSociales = await PartSociale.aggregate([
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
      }
    }
  ]);
  res.status(200).json(partSociales);
};

//get a single partSociale
const getPartSociale = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "id non valide!" });
  }

  const partSociale = await PartSociale.findOne({ _id: id });

  if (!partSociale) {
    return res.status(400).json({ error: "Aucun part sociale ne correspond!" });
  }

  res.status(200).json(partSociale);
};

// create a new partSociale
const createPartSociale = async (req, res) => {
  console.log(req.body);

  // let emptyFields = [];
  // if (!partSociale_id) {
  //   emptyFields.push("id partSociale");
  // }
  // if (emptyFields.length > 0) {
  //   return res
  //     .status(400)
  //     .json({ error: "Veuillez remplir les champs manquants", emptyFields });
  // }

  // add to the database
  try {
    const partSociale = await PartSociale.create({ ...req.body });
    res.status(200).json(partSociale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete an partSociale
const deletePartSociale = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "l'id n'est pas valide!" });
  }

  const partSociale = await PartSociale.findOneAndDelete({ _id: id });

  if (!partSociale) {
    return res.status(400).json({ error: "Aucun partSociale ne correspond!" });
  }

  res.status(200).json(partSociale);
};

//update an partSociale
const updatePartSociale = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Aucun partSociale ne correspond!" });
  }

  const partSociale = await PartSociale.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!partSociale) {
    return res.status(400).json({ error: "Aucun partSociale ne correspond!" });
  }

  res.status(200).json(partSociale);
};

module.exports = {
  getPartSociales,
  getPartSociale,
  createPartSociale,
  updatePartSociale,
  deletePartSociale,
};
