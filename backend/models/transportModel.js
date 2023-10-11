const mongoose = require("mongoose");

const TransportSchema = mongoose.Schema(
  {
    NUM_ORDRE: {
      type: Number,
      unique: true,
      required: true,
      min: 10000,
      max: 99999,
    },
    DATE_TRANS: {
      type: String,
      validate: {
        validator: function (value) {
          // Validate the format using a regular expression
          // still could accept 13th month and 99 day of the month, though
          return /^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2} [APM]{2}$/g.test(value);
        },
        message: "Invalid date format. Format should be YYYY-MM-DD h:mm A.",
      },
      required: true,
    },
    SEMAINE: {
      type: Number,
      min: 1,
      max: 53,
    },
    JOUR_SEMAINE: {
      type: String,
      enum: [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
      ],
    },
    NB_DETAIL: {
      type: Number,
      min: 1,
    },
    IMMATRICULATION: {
      type: String,
    },
    CHAUFFEUR: {
      type: String,
    },
    CODE_SITE: {
      type: Number,
      min: 1,
    },
    ETAT_TRANSFERT: {
      type: Number,
    },
  },
  { collection: "transport" }
);
module.exports = mongoose.model("Transport", TransportSchema);
