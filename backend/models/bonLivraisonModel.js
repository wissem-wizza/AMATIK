const mongoose = require("mongoose");

const bonLivraisonSchema = mongoose.Schema(
    {
        BON: Number,
        Num_BL: Number,
        DATE_LIV: String,
        DATE_ENL: String,
        NB_Betes: Number,
        Poids: Number,
        N_IDENTIF: String,
        CLASS: String,
        ESPECE: String,
        Regroupement: String,
        Designation: String,
        eleveur_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'eleveur',
            required: true,
        },
        CLE: String,
        Eleveur: String,
        CODE_SITE: Number,
        Chauffeur: String,
        Vehicule: String,
    },
    { collection: "bon_livraison" },
    { timestamps: true }
);
module.exports = mongoose.model("BonLivraison", bonLivraisonSchema);
