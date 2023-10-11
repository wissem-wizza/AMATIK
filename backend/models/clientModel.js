const mongoose = require("mongoose");
const validator = require("validator");

const clientSchema = mongoose.Schema(
  {
    NOM: {
      type: String,
      required: [true, "Veuillez ajouter un nom pour ce client"],
      index: true,
    },
    CLE: {
      type: String,
      required: [true, "Veuillez ajouter un clé pour ce client"],
    },
    TETE: {
      type: String,
    },
    VACHM: {
      type: Number,
    },
    TELEP: {
      type: String,
    },
    portable: {
      type: String,
    },
    FAX: {
      type: String,
    },
    ADR0: {
      type: String,
    },
    ADR1: {
      type: String,
    },
    ADR2: {
      type: String,
    },
    ADRLIV0: {
      type: String,
    },
    ADRLIV1: {
      type: String,
    },
    ADRLIV2: {
      type: String,
    },
    EMAIL: {
      type: String,
      unique: true,
      validate: {
        validator: function (email) {
          return validator.isEmail(email);
        },
        message: "Veuillez saisir une adresse e-mail valide.",
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
    SIRET: {
      type: String,
      default: null,
    },
    TVA_intra: {
      type: String,
      default: null,
    },
    REGIME_TVA: {
      type: String,
    },
    agr_sanitaire: {
      type: String,
    },
    type_client: {
      type: Number,
    },
    REGLEMENT: {
      type: String,
      enum: [
        'CHEQUE',
        'CHEQUE 8 JOURS',
        'CHEQUE 21 JOURS',
        'CHEQUE 30 JOURS',
        'VIREMENT',
        'VIREMENT 8 JOURS',
        'VIREMENT 21 JOURS'
      ],
    },
  },
  { collection: "client" },
  { timestamps: true }
);
module.exports = mongoose.model("Client", clientSchema);
