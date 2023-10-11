const BonLivraison = require("../models/bonLivraisonModel");
const mongoose = require("mongoose");
const { Site } = require("../models/otherModels")


const filterUniqueLabels = (arr) => {
    const uniqueLabels = {};
    return arr.filter(obj =>
        obj.label !== '' && !uniqueLabels.hasOwnProperty(obj.label)
            ? (uniqueLabels[obj.label] = true)
            : false
    );
}

// @route   GET /api/bon_livraison
// @desc    get "bon_livraison" list (filtered if requested by eleveur)
// @access  authenticated supervisor (or eleveur if eligible)
const getBonLivraisons = async (req, res) => {
    try {
        const bonLivraisons = await BonLivraison.aggregate(
            [
                {
                    $lookup: {
                        from: 'site',
                        localField: 'CODE_SITE',
                        foreignField: 'CODE_SITE',
                        as: 'siteInfo',
                    },
                },
                {
                    $unwind: '$siteInfo',
                },
                {
                    $project: {
                        Num_BL: 1,
                        DATE_LIV: 1,
                        NB_Betes: 1,
                        Poids: 1,
                        ESPECE: 1,
                        Regroupement: 1,
                        Designation: 1,
                        Eleveur: 1,
                        SITE: '$siteInfo.DESIGNATION',
                        Chauffeur: 1,
                        Vehicule: 1,
                    }
                },
                {
                    $sort: {
                        DATE_LIV: -1
                    }
                }
            ]
        )
        res.status(200).json(bonLivraisons);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

// @route   GET /api/bon_livraison/:id
// @desc    get one "bon_livraison" record
// @access  authenticated supervisor (or eleveur if eligible)
const getBonLivraison = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "id non valide!" });
    }

    try {
        const bonLivraison = await BonLivraison.findById(id);

        if (!bonLivraison) {
            return res.status(400).json({ error: "Aucun bon livraison ne correspond!" });
        }

        res.status(200).json(bonLivraison);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

// @route   GET /api/bon_livraison/eleveur/:id
// @desc    get bon livraison list related to one eleveur
// @access  authenticated supervisor or eleveur creator of bon livraison
const getBonLivraisonsByEleveur = async (req, res) => {

    const { id: eleveur_id } = req.params

    if (!mongoose.Types.ObjectId.isValid(eleveur_id)) {
        return res.status(404).json({ error: "id non valid!" });
    }

    try {
        const bonLivraisons = await BonLivraison.find({
            eleveur_id: mongoose.Types.ObjectId(eleveur_id)
        }).sort({ DATE_LIV: -1 })

        if (!bonLivraisons) {
            return res.status(400).json({ error: "Aucun bon livraison ne correspond!" });
        }

        res.status(200).json(bonLivraisons)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @route   GET /api/bon_livraison/select
// @desc    get list of sites used in list & form of "bon livraison"
// @access  authenticated supervisor
const getBonLivraisonSelectFields = async (req, res) => {
    try {
        const sites = await Site.aggregate([
            {
                $group: {
                    _id: '$CODE_SITE',
                    DESIGNATION: { $first: '$DESIGNATION' }
                }
            },
            {
                $project: {
                    _id: 0,
                    label: '$DESIGNATION',
                    id: '$_id'
                }
            }
        ]);
        const otherSelects = await BonLivraison.aggregate([
            {
                $group: {
                    _id: null,
                    Vehicule: { $addToSet: '$Vehicule' },
                    Chauffeur: { $addToSet: '$Chauffeur' },
                    ESPECE: { $addToSet: '$ESPECE' },
                    Designation: { $addToSet: '$Designation' }
                }
            },
            {
                $project: {
                    _id: 0,
                    Vehicule: {
                        $map: {
                            input: { $range: [0, { $size: '$Vehicule' }] },
                            as: 'index',
                            in: {
                                label: { $arrayElemAt: ['$Vehicule', '$$index'] },
                                value: '$$index'
                            }
                        }
                    },
                    Chauffeur: {
                        $map: {
                            input: { $range: [0, { $size: '$Chauffeur' }] },
                            as: 'index',
                            in: {
                                label: { $arrayElemAt: ['$Chauffeur', '$$index'] },
                                value: '$$index'
                            }
                        }
                    },
                    ESPECE: {
                        $map: {
                            input: { $range: [0, { $size: '$ESPECE' }] },
                            as: 'index',
                            in: {
                                label: { $arrayElemAt: ['$ESPECE', '$$index'] },
                                value: '$$index'
                            }
                        }
                    },
                    Designation: {
                        $map: {
                            input: { $range: [0, { $size: '$Designation' }] },
                            as: 'index',
                            in: {
                                label: { $arrayElemAt: ['$Designation', '$$index'] },
                                value: '$$index'
                            }
                        }
                    }
                }
            }
        ])

        let { Designation, ...restOfSelect } = otherSelects[0]
        Designation = Designation.map(designation => ({label: designation.label.trim(), value: designation.value}))

        res.status(200).json({
            sites,
            Designation: filterUniqueLabels(Designation),
            ...restOfSelect,
        });
    } catch (error) { // catching on multiple await statements
        res.status(400).json({ error: error.message })
    }
};

module.exports = {
    getBonLivraisons,
    getBonLivraison,
    getBonLivraisonSelectFields,
    getBonLivraisonsByEleveur,
};
