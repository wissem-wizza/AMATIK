const mongoose = require('mongoose');

const identificationSchema = new mongoose.Schema({
    NumAnnonce: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^[0-9]{6}$/.test(value);
            },
            message: 'NumAnnonce must be a unique 6-digit number.'
        }
    },
    DATE_TOURNEE: {
        type: String,
        match: /^\d{4}-\d{2}-\d{2}$/,
        required: true
    },
    SEMAINE: {
        type: Number,
        max: 53,
        min: 0
    },
    SERVICE: {
        type: String,
        enum: ['OVINS', 'BOVINS', 'CAPRINS', 'LAINE']
    },
    CODE_ELEVEUR: {
        type: String,
    },
    NAISSEUR: {
        type: String
    },
    eleveur_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    NB_MOUT: {
        type: Number,
        default: 0
    },
    dispoTransp: {
        type: Boolean,
        default: false,
    },
    TRANSPORT: {
        type: Number,
        default: 0,
    }
},
    { collection: "identification" },
    { timestamps: true }
);

const Identification = mongoose.model('Identification', identificationSchema);

module.exports = Identification;
