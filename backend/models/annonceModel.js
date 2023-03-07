const mongoose = require("mongoose");

const annonceSchema = mongoose.Schema({
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  centre_ramassage: {
    type: String,
    required: true,
  },
  quantite_animeaux: {
    type: Number,
    required: true,
  },
  nature: {
    type: String,
    required: true,
  },
  poids: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Annonce", annonceSchema);
