const Abattage = require("../models/abattageModel");
const mongoose = require("mongoose");


// @route   GET /api/abattage
// @desc    get abattage list
// @access  authenticated supervisor
const getAbattages = async (req, res) => {
    try {
        const abattages = await Abattage.aggregate([
            { $match: { CONSIGNE: 'C' } },
            { $sort: { NUM_PESEE: -1, ARTICLE: 1, NUM_TUERIE: 1, NUM_ANIMAL: 1 } },
            // { $limit: 25 }, // get rid of it later...
            {
                $project: {
                    NUM_BON_ENTREE: 1,
                    NUM_TUERIE: 1,
                    NUM_PESEE: 1,
                    NUM_ABATTAGE: 1,
                    DATE_ABATTAGE: 1,
                    CODE_FOURNISSEUR: 1,
                    CODE_ABATTEUR: 1,
                    ARTICLE: 1,
                    CHEPTEL_NAISSEUR: 1,
                    NUM_ELEVEUR: 1,
                    OBSERVATION: 1,
                    NUM_ANIMAL: 1,
                    BOUCLE3: 1,
                    CLASSEMENT: 1,
                    POIDS_FROID: 1,
                    NUM_LOT: 1,
                    AFFECT_IDENT: 1,
                    nom_fournisseur: 1,
                    LIBELLE_MOTIF: 1
                }
            }
        ]);
        res.status(200).json(abattages);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

// @route   GET /api/abattage/:id
// @desc    get one abattage record
// @access  authenticated supervisor
const getAbattage = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "id non valide!" });
    }

    try {
        const abattage = await Abattage.findById(id);
    
        if (!abattage) {
            return res.status(400).json({ error: "Aucun abattage ne correspond!" });
        }
    
        res.status(200).json(abattage);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

// @route   POST /api/abattage
// @desc    create a new abattage record
// @access  authenticated supervisor
const createAbattage = async (req, res) => {

    try {
        const abattage = await Abattage.create({ ...req.body });
        res.status(200).json(abattage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @route   DELETE /api/abattage/:id
// @desc    delete one abattage record
// @access  authenticated supervisor
const deleteAbattage = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "l'id n'est pas valide!" });
    }

    try {
        const abattage = await Abattage.findOneAndDelete({ _id: id });
    
        if (!abattage) {
            return res.status(400).json({ error: "Aucun abattage ne correspond!" });
        }
    
        res.status(200).json(abattage);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

// @route   PATCH /api/abattage/:id
// @desc    update one abattage record
// @access  authenticated supervisor
const updateAbattage = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Aucun abattage ne correspond!" });
    }

    try {
        const abattage = await Abattage.findOneAndUpdate(
            { _id: id },
            {
                ...req.body,
            },
            { new: true }
        );
    
        if (!abattage) {
            return res.status(400).json({ error: "Aucun abattage ne correspond!" });
        }
    
        res.status(200).json(abattage);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

module.exports = {
    getAbattages,
    getAbattage,
    createAbattage,
    updateAbattage,
    deleteAbattage,
};
