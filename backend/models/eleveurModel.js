const mongoose = require("mongoose");
const validator = require("validator");

const eleveurSchema = mongoose.Schema(
  {
    NOM: {
      type: String,
      required: [true, "Veuillez ajouter un nom pour cet éleveur"],
      index: true,
    },
    CLE: {
      type: String,
      required: true,
    },
    TETE: {
      type: String,
    },
    ADRESSES: {
      type: [String],
      default: [],
    },
    ADRESSES_LIVRAISON: {
      type: [String],
      default: [],
    },
    CODE_SITE: { // necessary for some queries to work
      type: Number,
    },
    CHEPTEL: {
      //NUM_ELEVEUR
      type: Number,
      unique: true,
      validate: {
        validator: function (value) {
          // return (value.length = 8);
          return value.toString().length === 8;
        },
        message: "Le numéro de cheptel doit être de longueur 8.",
      },
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: function (email) {
          return validator.isEmail(email);
        },
        message: "Veuillez saisir une adresse e-mail valide.",
      },
    },
    CBANK: {
      type: Number,
      validate: {
        validator: function (v) {
          return /^([0-9]{5})$/.test(v);
        },
        message: (props) =>
          `${props.value} le numéro de banque saisi n'est pas valide.`,
      },
    },
    GUICH: {
      type: Number,
      validate: {
        validator: function (v) {
          return /^([0-9]{5})$/.test(v);
        },
        message: (props) =>
          `${props.value} le numéro de l'agence saisi n'est pas valide.`,
      },
    },
    COMPTE: {
      type: Number,
      validate: {
        validator: function (v) {
          return /^([0-9]{11})$/.test(v);
        },
        message: (props) =>
          `${props.value} le numéro de compte saisi n'est pas valide.`,
      },
    },
    RIB: {
      type: Number,
      validate: {
        validator: function (v) {
          return /^([0-9]{2})$/.test(v);
        },
        message: (props) => `${props.value} le RIB saisi n'est pas valide.`,
      },
    },
    label: {
      type: String,
      enum: ["B", "L", "O", "S", ""],
      default: "",
    },
    SIRET: {
      type: String,
      default: null,
    },
    TVA_intra: {
      type: String,
      default: null,
    },
    // groupement reglement TELEP portable(+validation)
  },
  { collection: "eleveur" },
  { timestamps: true }
);

module.exports = mongoose.model("Eleveur", eleveurSchema);