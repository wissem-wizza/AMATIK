const mongoose = require("mongoose");

const ristourneSchema = mongoose.Schema(
    {
        NUMPRO: {
            type: String,
            required: true
        },
        NUMCOMA: {
            type: Number,
            required: true
        },
        NUMFACA: {
            type: Number,
            required: true
        },
        ANNA: {
            type: Number,
            required: true
        },
        QCOM: {
            type: Number,
            required: true
        },
        PU_ACH: {
            type: Number,
            required: true
        },
        PTOT_ACH: {
            type: Number,
            required: true
        },
        eleveur_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
    },
    { collection: "ligne" },
    { timestamps: true }
);

module.exports = mongoose.model("Ristourne", ristourneSchema);
