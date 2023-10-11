const mongoose = require("mongoose");
const Annonce = require("../models/annonceModel");
const Eleveur = require("../models/eleveurModel");
const { Site } = require("../models/otherModels");

const admin = require("firebase-admin");
const serviceAccount = require("../google-services.json"); // Remplacez par le chemin de votre fichier de clé privée Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://<VOTRE_PROJET>.firebaseio.com", // Remplacez par l'URL de votre base de données Firebase
});

const {
  pipelineWithRaceFilter,
  annoncesByEleveurWithRaceFilter,
  AnnonceCategoryByMonth,
  AnnonceByEtat,
} = require("../helpers/annonceHelpers");

// @route   GET /api/annonce
// @desc    get parametrized annonce list
// @access  authenticated
const getAnnonces = async (req, res) => {
  try {
    const annonces = await Annonce.aggregate(
      pipelineWithRaceFilter({ $nin: ["VIANDE", "LAINE"] })
    );
    res.status(200).json(annonces);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   GET /api/annonce/statistics
// @desc    get annonce Statistics
// @access  authenticated
const getAnnonceStatistics = async (req, res) => {
  try {
    const annonces = await Annonce.aggregate(AnnonceCategoryByMonth());
    res.status(200).json(annonces);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   GET /api/annonce/etat
// @desc    get annonce Etat
// @access  authenticated
const getAnnonceByEtat = async (req, res) => {
  try {
    const annonces = await Annonce.aggregate(AnnonceByEtat());
    res.status(200).json(annonces);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   GET /api/annonce/eleveur/:id
// @desc    get annonce list created by one eleveur
// @access  authenticated supervisor or eleveur creator of annonce
const getAnnoncesByEleveur = async (req, res) => {
  annoncesByEleveurWithRaceFilter(req, res, {
    RACE: { $nin: ["VIANDE", "LAINE"] },
  });
};

// @route   GET /api/annonce/:id
// @desc    get annonce by id
// @access  authenticated
const getAnnonce = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "id non valid!" });
  }
  try {
    const annonce = await Annonce.findById(id);
    if (!annonce) {
      return res.status(400).json({ error: "Aucune annonce ne correspond!" });
    }
    res.status(200).json(annonce);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   GET /api/annonce/select
// @desc    get list of different topics to serve as select options in annonce form & list view
// @access  authenticated supervisor
const getAnnonceSelectFields = async (req, res) => {
  try {
    const RACE = (await Annonce.find({}).distinct("RACE"))
      .map((race) => race.trim())
      .filter((value) => Boolean(value));
    const MOYEN = (await Annonce.find({}).distinct("MOYEN"))
      .map((moyen) => moyen.trim())
      .filter((value) => Boolean(value));
    const EtatAnnonce = (await Annonce.find({}).distinct("EtatAnnonce"))
      .map((etat) => etat.trim())
      .filter((value) => Boolean(value));

    res.status(200).json({ RACE, MOYEN, EtatAnnonce });
  } catch (error) {
    // catching on multiple await statements
    res.status(400).json({ error: error.message });
  }
};

// @route   POST /api/annonce
// @desc    create a new annonce record
// @access  authenticated eleveur
const createAnnonce = async (req, res) => {
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
  if (!mongoose.Types.ObjectId.isValid(req.body.eleveur_id)) {
    return res.status(404).json({ error: "id de l'eleveur est non valide!" });
  }

  try {
    const eleveur_id = mongoose.Types.ObjectId(req.body.eleveur_id);
    const DATE_ANNONCE = new Date(req.body.DATE);
    const annonce = await Annonce.create({
      ...req.body,
      eleveur_id,
      DATE_ANNONCE,
    });

    // for new "annonce" to be directly integrated in the DataGrid
    const eleveur = await Eleveur.findOne(
      { CLE: annonce?.CLE },
      { CODE_SITE: 1, NOM: 1, ADRESSES: 1 }
    );
    const site = await Site.findOne({ CODE_SITE: eleveur?.CODE_SITE });

    res.status(200).json({
      ...annonce.toObject(),
      DESIGNATION: site?.DESIGNATION,
      NOM: eleveur?.NOM,
      ADRESSE: eleveur?.ADRESSES,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   DELETE /api/annonce/:id
// @desc    delete one annonce record
// @access  authenticated eleveur
const deleteAnnonce = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "l'id n'est pas valide!" });
  }

  try {
    const annonce = await Annonce.findOneAndDelete({ _id: id });

    if (!annonce) {
      return res.status(400).json({ error: "Aucune annonce ne correspond!" });
    }

    res.status(200).json(annonce);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @route   PATCH /api/annonce/:id
// @desc    update one annonce record
// @access  authenticated eleveur, creator of annonce
const updateAnnonce = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Aucune annonce ne correspond!" });
  }

  try {
    const annonce = await Annonce.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );
    if (!annonce) {
      return res.status(400).json({ error: "Aucune annonce ne correspond!" });
    }
    console.log("before ", annonce.DEVICE_ID);
    if (req.body.EtatAnnonce === "validé" && annonce.DEVICE_ID) {
      const registrationToken = annonce.DEVICE_ID;
      console.log("after", registrationToken);

      const message = {
        notification: {
          title: "Validation Annonce",
          body:
            "Félicitations ! Votre annonce numéro " +
            annonce.NUM_ENREGIST +
            " a été validée avec succès. Nous vous remercions de votre contribution précieuse à notre application.",
        },
        token: registrationToken,
      };
      console.log("msg ttl", message.notification.title);

      admin
        .messaging()
        .send(message)
        .then((response) => {
          console.log("Notification envoyée avec succès:", response);
        })
        .catch((error) => {
          console.log("Erreur lors de l'envoi de la notification:", error);
        });
    }

    if (req.body.EtatAnnonce === "Rejeté" && annonce.DEVICE_ID) {
      const registrationToken = annonce.DEVICE_ID;

      const message = {
        notification: {
          title: "Refus de l'Annonce",
          body:
            "Nous avons examiné votre annonce numéro " +
            annonce.NUM_ENREGIST +
            ", malheureusement, nous ne pouvons pas la valider pour le moment. Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter.",
        },
        token: registrationToken,
      };

      admin
        .messaging()
        .send(message)
        .then((response) => {
          console.log("Notification envoyée avec succès:", response);
        })
        .catch((error) => {
          console.log("Erreur lors de l'envoi de la notification:", error);
        });
    }

    res.status(200).json(annonce);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAnnonce,
  getAnnonces,
  getAnnonceByEtat,
  getAnnonceStatistics,
  getAnnoncesByEleveur,
  getAnnonceSelectFields,
  createAnnonce,
  updateAnnonce,
  deleteAnnonce,
};
