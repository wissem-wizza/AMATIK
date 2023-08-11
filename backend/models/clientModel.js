const mongoose = require("mongoose");
const validator = require("validator");

const clientSchema = mongoose.Schema(
  {
    // _id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    // },
    NOM: {
      type: String,
      required: [true, "Veuillez ajouter un nom pour cet éleveur"],
      index: true,
    },
    ADRESSES: {
      type: [String],
      default: [],
    },
    ADRESSES_LIVRAISON: {
      type: [String],
      default: [],
    },
    CHEPTEL: {
      //NUM_CLIENT
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
    LIVRAISON: {
      type: String,
      enum: ["TRANSPORTES", "RAMASSES", ""],
    },
    DEVISE: {
      type: String,
      enum: ["EUR", "USD"], // we should change values "E" to "EUR" in "client" collection"
      default: "EUR",
    },
    //données banquaire
    IBAN: {
      type: String,
      trim: true,
      // unique: true,
      validate: {
        validator: function (IBAN) {
          return validator.isIBAN(IBAN);
        },
        message: "l'IBAN saisi n'est pas valide.",
      },
    },
    BIC: {
      type: String,
      trim: true,
      validate: {
        validator: function (BIC) {
          return validator.isBIC(BIC);
        },
        message: "le code BIC saisi n'est pas valide.",
      },
    },
    DOMICILIATION: {
      type: String, //UpperCase
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
    // CPT: {}, //n° compte comptable
    // CPTA: {}, // n° compte analytique
    TYPADH: {
      type: String,
      enum: ["A", "F"],
      default: "F",
    },
    label: {
      type: String,
      enum: ["B", "L", "O", "S", ""],
      default: "",
    },
    CHEPTEL2: {
      //type etablissement
      type: Number,
      default: 10,
    },
    DEPARTEMENT: { type: Number, default: 64 },
    pas_envoi_simoc: { type: Boolean },
    dsimoc: { type: Boolean },
    DROITS_ENTREE: { type: Boolean },
    ACTIF: { type: Boolean, default: 1 },
    PRELEVEMENTS: { type: Boolean },
    FINANCEMENT: { type: Boolean },
    DEMISSION: { type: Boolean },
    SIRET: {
      type: String,
      default: null,
    },
    TVA_intra: {
      type: String,
      default: null,
    },
    laine: {
      type: String,
      enum: ["Laine", "Viande", "Les deux"], // tout "Les_deux" => "Les deux"
      default: "Les deux",
    },
    DATADH: {
      type: Date, //to verify (+ we can add date validation)
    },
    DATCREAT: {
      type: Date, //to verify (+ we can add date validation) OR switch by timestamp
    },
    DATMODIF: {
      type: Date, //to verify (+ we can add date validation) OR switch by timestamp
    },
    // groupement reglement TELEP portable(+validation)
  },
  { collection: "client" },
  { timestamps: true }
);
module.exports = mongoose.model("Client", clientSchema);
