const Annonce = require("../models/annonceModel");
const { Nature } = require("../models/otherModels")
const {
    pipelineWithRaceFilter,
    annoncesByEleveurWithRaceFilter,
} = require("../helpers/annonceHelpers")

// @route   GET /api/annonce_laine
// @desc    get parametrized annonce-laine list
// @access  authenticated
const getAnnoncesLaine = async (req, res) => {
    try {
        const annonces = await Annonce.aggregate(pipelineWithRaceFilter({ $eq: "LAINE" }));
        res.status(200).json(annonces)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @route   GET /api/annonce_laine/eleveur/:id
// @desc    get annonce-laine list created by one eleveur
// @access  authenticated supervisor or eleveur creator of annonce
const getAnnoncesLaineByEleveur = async (req, res) => {
    annoncesByEleveurWithRaceFilter(req, res, {RACE: { $eq: "LAINE" }})
};

// @route   GET /api/annonce_laine/select
// @desc    get list of different topics to serve as select options in annonce form & list view
// @access  authenticated supervisor
const getAnnonceLaineSelectFields = async (req, res) => {
    try {
        const EtatAnnonce = (await Annonce.find({}).distinct("EtatAnnonce"))
            .map((etat) => etat.trim())
            .filter((value) => Boolean(value));

        const TYPE = (
            await Nature.find({ESPECE: "LAINE"}, {DESIGNATION: 1})
        ).map(item => ({value: item.DESIGNATION, id: item._id}))

        res.status(200).json({ EtatAnnonce, TYPE });
    } catch (error) {
        // catching on multiple await statements
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    getAnnoncesLaine,
    getAnnoncesLaineByEleveur,
    getAnnonceLaineSelectFields,
}