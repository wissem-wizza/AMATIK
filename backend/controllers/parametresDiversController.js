// controllers/parametresDiversController.js
const ParametresDivers = require('../models/parametresDiversModel');

// @route   POST /api/parametres_divers
// @desc    create a new "parametres_divers" collection record
// @access  authenticated supervisor
const createRecord = async (req, res) => {
    try {
        const record = await ParametresDivers.create(req.body);
        res.status(200).json(record);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// @route   GET /api/parametres_divers/:id
// @desc    get parametres_divers record by id
// @access  authenticated supervisor
const getRecord = async (req, res) => {
    const ID = req.params.id;

    try {
        const record = await ParametresDivers.findOne({ID});

        // [transport, annonce, eleveur, cheptel, client]
        if ([5, 99, 101, 102, 103].includes(record?.ID)) {
            record.valeur += 1;
            try {
                await record.save();
                res.status(200).json(record);
            } catch (error) {
                // if this operation failed then no new ID gonna be returned to end user
                res.status(400).json({ error: err.message });
            }
        } else {
            res.status(200).json(record);
        }

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createRecord,
    getRecord,
};
