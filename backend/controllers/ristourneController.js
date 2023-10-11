const Ristourne = require("../models/ristourneModel");
const mongoose = require("mongoose");


// @route   GET /api/ristourne
// @desc    get parametrized ristourne list
// @access  authenticated
const getRistournes = async (req, res) => {

    try {
        const ristournes = await Ristourne.aggregate([
            {
                $match: {
                    NUMPRO: 'RIST4'
                }
            },
            {
                $lookup: {
                    from: "eleveur",
                    localField: "NUMFOU",
                    foreignField: "CLE",
                    as: "eleveur"
                }
            },
            {
                $unwind: "$eleveur"
            },
            {
                $project: {
                    "CLE": "$eleveur.CLE",
                    "NOM": "$eleveur.NOM",
                    "CHEPTEL": "$eleveur.CHEPTEL",
                    "NUMCOMA": 1,
                    "NUMFACA": 1,
                    "ANNA": 1,
                    "QCOM": 1,
                    "PU_ACH": 1,
                    "PTOT_ACH": 1
                }
            },            
            {
                $sort: {
                    "eleveur.NOM": 1,
                    "ANNA": -1
                }
            }
        ]);
        res.status(200).json(ristournes)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @route   GET /api/ristourne/eleveur/:id
// @desc    get ristourne list created by one eleveur
// @access  authenticated supervisor or eleveur creator of ristourne
const getRistournesByEleveur = async (req, res) => {
    
    const { id: eleveur_id } = req.params

    if (!mongoose.Types.ObjectId.isValid(eleveur_id)) {
        return res.status(404).json({ error: "id non valid!" });
    }

    try {
        const ristournes = await Ristourne.find(
            { NUMPRO: "RIST4", eleveur_id: mongoose.Types.ObjectId(eleveur_id) },
            {
                NUMCOMA: 1,
                NUMFACA: 1,
                ANNA: 1,
                QCOM: 1,
                PU_ACH: 1,
                PTOT_ACH: 1,
                eleveur_id: 1,
            }).sort({ANNA: -1})

        if (!ristournes) {
            return res.status(400).json({ error: "Aucune ristourne ne correspond!" });
        }

        res.status(200).json(ristournes)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @route   GET /api/ristourne/:id
// @desc    get ristourne by id
// @access  authenticated
const getRistourne = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "id non valid!" });
    }
    try {
        const ristourne = await Ristourne.findById(id);
        if (!ristourne) {
            return res.status(400).json({ error: "Aucune ristourne ne correspond!" });
        }
        res.status(200).json(ristourne);
    } catch (error) {

    }
};

module.exports = {
    getRistourne,
    getRistournes,
    getRistournesByEleveur,
};
