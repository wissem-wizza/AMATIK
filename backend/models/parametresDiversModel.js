const mongoose = require('mongoose');

const parametresDiversSchema = new mongoose.Schema({
    ID: Number,
    libelle: String,
    valeur: Number,
}, {
    collection: "parametres_divers"
});

module.exports = mongoose.model('ParametresDivers', parametresDiversSchema);
