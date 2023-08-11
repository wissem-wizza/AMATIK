const mongoose = require("mongoose");
// const validator = require("validator");

const annonceSchema = mongoose.Schema(
  {
    // _id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    // },
    NUM_ENREGIST: {
      type: Number,
      required: [
        true,
        "Veuillez ajouter un numéro d'enregistrement de votre annonce",
      ],
      index: true,
    },
    MOYEN: {
      type: String,
      default: "",
    },
    NOM: {
      type: String,
      default: "",
    },
    DATE: {
      type: String,
    },
    AGENT: {
      type: String,
    },
  },
  { collection: "annonce" },
  { timestamps: true }
);
module.exports = mongoose.model("Annonce", annonceSchema);
