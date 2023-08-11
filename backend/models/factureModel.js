const mongoose = require("mongoose");
// const validator = require("validator");

const factureSchema = mongoose.Schema(
  {
    // _id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    // },
    NUMFAC: {
      type: Number,
      required: [true, "Veuillez ajouter le numéro de facture"],
      index: true,
    },
    NUMCOM: {
      type: Number,
      default: 0,
    },
    DATCREAT: {
      type: String, //to verify (+ we can add date validation) OR switch by timestamp
    },
    HT: {
      type: Number, //to verify (+ we can add date validation) OR switch by timestamp
    },
    NUMREP: {
      type: String, //to verify (+ we can add date validation) OR switch by timestamp
    },
  },
  { collection: "facture" },
  { timestamps: true }
);
module.exports = mongoose.model("Facture", factureSchema);
