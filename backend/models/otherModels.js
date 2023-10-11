const mongoose = require('mongoose')

const siteSchema = mongoose.Schema({
    DESIGNATION: String,
    CODE_SITE: Number
},
{ collection: "site" },
);

const natureSchema = mongoose.Schema({
    ESPECE: String,
    DESIGNATION: String,
},
{ collection: "nature" },
);

const labelSchema = mongoose.Schema({
    type: Number,
    code: String,
    libelle: String,
},
{ collection: "label" },
);


module.exports = {
    Site: mongoose.model("Site", siteSchema),
    Nature: mongoose.model("Nature", natureSchema),
    Label: mongoose.model("Label", labelSchema),
};