const { Label, Nature } = require("../models/otherModels");

// @route   GET /api/other/label
// @desc    get label list
// @access  authenticated
const getLabels = async (req, res) => {
    const labels = await Label.find({ type: 31 }, {code: 1, libelle: 1})

    try {
        res.status(200).json(labels)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// @route   GET /api/other/nature
// @desc    get unique nature values list
// @access  authenticated supervisor
const getNatures = async (req, res) => {
    try {
        const DESIGNATION = (
            await Nature.find({ESPECE: "LAINE"}, {DESIGNATION: 1})
        ).map(item => ({value: item.DESIGNATION, id: item._id}))

        res.status(200).json({
            DESIGNATION,
        });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

module.exports = {
    getLabels,
    getNatures,
}