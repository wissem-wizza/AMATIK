const mongoose = require("mongoose");
// const validator = require("validator");

const partSocialeSchema = mongoose.Schema(
  {
    eleveur_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'eleveur',
      required: true,
    },
    facture_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'facture',
      required: true,
    },
    datop: {
      type: Date, //to verify (+ we can add date validation)
    },
  },
  { collection: "part_sociale" },
  { timestamps: true }
);
module.exports = mongoose.model("PartSociale", partSocialeSchema);
