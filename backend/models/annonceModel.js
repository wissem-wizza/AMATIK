const mongoose = require("mongoose");

const annonceSchema = new mongoose.Schema(
  {
    NUM_ENREGIST: {
      type: Number,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[0-9]{6}$/.test(value);
        },
        message: "NUM_ENREGIST must be a unique 6-digit number.",
      },
    },
    DATE: {
      type: String,
      match: /^\d{4}-\d{2}-\d{2}$/,
      required: true,
    },
    DATE_ANNONCE: {
      type: Date,
    },
    SEMAINE: {
      type: Number,
      max: 53,
      min: 0,
    },
    RACE: {
      type: String,
      enum: ["OVINS", "BOVINS", "CAPRINS", "LAINE"],
    },
    CLE: {
      type: String,
      // need to verify
      // validate: {
      //   validator: function (value) {
      //     return /^[0-9]{6}$/.test(value);
      //   },
      //   message: 'CLE must be a 6-digit number.'
      // }
    },
    NOM: {
      type: String,
    },
    EtatAnnonce: {
      type: String,
      enum: ["validé", "Rejeté", "en cours"],
      default: "en cours",
    },
    eleveur_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    MOYEN: {
      type: String,
      enum: ["A Prendre", "Eux mêmes"],
      default: "A Prendre",
    },
    DEVICE_ID: {
      type: String,
    },
    TYPE: {
      type: Number,
    },
    GROUPE: {
      type: {
        OVINS: {
          type: {
            BREBIES: {
              type: {
                NB_LG: { type: Number, default: 0 },
                NB_MY: { type: Number, default: 0 },
                NB_LR: { type: Number, default: 0 },
                TOTAL: { type: Number, default: 0 },
              },
            },
            BELIERS: {
              type: {
                NB_LG: { type: Number, default: 0 },
                NB_MY: { type: Number, default: 0 },
                NB_LR: { type: Number, default: 0 },
                TOTAL: { type: Number, default: 0 },
              },
            },
            AGNAUX: {
              type: {
                NB_LG: { type: Number, default: 0 },
                NB_MY: { type: Number, default: 0 },
                NB_LR: { type: Number, default: 0 },
                TOTAL: { type: Number, default: 0 },
              },
            },
            TOTAL: { type: Number, default: 0 },
          },
          default: {
            BREBIES: {
              NB_LG: 0,
              NB_MY: 0,
              NB_LR: 0,
              TOTAL: 0,
            },
            BELIERS: {
              NB_LG: 0,
              NB_MY: 0,
              NB_LR: 0,
              TOTAL: 0,
            },
            AGNAUX: {
              NB_LG: 0,
              NB_MY: 0,
              NB_LR: 0,
              TOTAL: 0,
            },
            TOTAL: 0,
          },
        },
        CAPRINS: {
          type: {
            NB_BOUCS: { type: Number, default: 0 },
            NB_CHEVRES: { type: Number, default: 0 },
            TOTAL: { type: Number, default: 0 },
          },
          default: {
            NB_BOUCS: 0,
            NB_CHEVRES: 0,
            TOTAL: 0,
          },
        },
        BOVINS: {
          type: {
            TOTAL: { type: Number, default: 0 },
          },
          default: {
            TOTAL: 0,
          },
        },
        LAINE: {
          type: {
            TOTAL: { type: Number, default: 0 },
          },
          default: {
            TOTAL: 0,
          },
        },
        TOTAL: { type: Number, default: 0 },
      },
      default: {
        OVINS: {
          BREBIES: {
            NB_LG: 0,
            NB_MY: 0,
            NB_LR: 0,
            TOTAL: 0,
          },
          BELIERS: {
            NB_LG: 0,
            NB_MY: 0,
            NB_LR: 0,
            TOTAL: 0,
          },
          AGNAUX: {
            NB_LG: 0,
            NB_MY: 0,
            NB_LR: 0,
            TOTAL: 0,
          },
          TOTAL: 0,
        },
        CAPRINS: {
          NB_BOUCS: 0,
          NB_CHEVRES: 0,
          TOTAL: 0,
        },
        BOVINS: {
          TOTAL: 0,
        },
        LAINE: {
          TOTAL: 0,
        },
        TOTAL: 0,
      },
      validate: {
        validator: function (value) {
          function areAllNumericFieldsInRange(obj) {
            for (const key in obj) {
              if (typeof obj[key] === "number") {
                if (obj[key] < 0 || obj[key] > 999) {
                  return false;
                }
              } else if (typeof obj[key] === "object") {
                if (!areAllNumericFieldsInRange(obj[key])) {
                  return false;
                }
              }
            }
            return true;
          }
          return areAllNumericFieldsInRange(value.GROUPE);
        },
        message:
          "All nested numeric fields in GROUPE must be in the range of 0 and 999.",
      },
    },
  },
  { collection: "annonce" },
  { timestamps: true }
);

const Annonce = mongoose.model("Annonce", annonceSchema);

module.exports = Annonce;
