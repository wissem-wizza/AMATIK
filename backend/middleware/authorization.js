const Eleveur = require('../models/eleveurModel')

const supervisorOnly = async (req, res, next) => {
    const { user } = req;

    if (user.type !== "Superviseur") {
        return res.status(403).json({
            message: 'Access Forbidden: Supervisor Only Access Allowed.'
        });
    }
    next();
}

const eleveurCreator = async (req, res, next) => {
    const { user } = req;
    const requestedEleveurId = req.params.id;
    let creatorId = null

    // better be handled with req.query rather than making a DB request:
    try {
        const eleveur = await Eleveur.findById(requestedEleveurId)
        creatorId = eleveur._id?.toString();
        if (user.type !== "Superviseur" && user.eleveur_id !== creatorId) {
            return res.status(403).json({
                message: 'Forbidden access, requesting user is not matching the requested eleveur'
            });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }

    next();
};

const eleveurCreatorByModel = (Model) => async (req, res, next) => {
    const { user } = req;
    const requestedRecordId = req.params.id;
    let creatorId = null

    // better be handled with req.query rather than making a DB request:
    try {
        const record = await Model.findById(requestedRecordId)
        creatorId = record.eleveur_id?.toString();
        console.log("real creator", creatorId, "currently requesting", user.eleveur_id || user.type)
        if (user.type !== "Superviseur" && user.eleveur_id !== creatorId) {
            return res.status(403).json({
                message: 'Forbidden access, not the creator of suggested record'
            });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }

    next();
};

module.exports = { supervisorOnly, eleveurCreator, eleveurCreatorByModel };
