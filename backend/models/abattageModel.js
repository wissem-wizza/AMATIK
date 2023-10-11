const mongoose = require("mongoose");

const abattageSchema = mongoose.Schema(
    {
    },
    { collection: "abattage" },
    { timestamps: true }
);
module.exports = mongoose.model("Abattage", abattageSchema);
