const Facture = require("../models/factureModel");
const mongoose = require("mongoose");

// @route   GET /api/facture
// @desc    get facture list
// @access  authenticated supervisor
const getFactures = async (req, res) => {
  try {
    const factures = await Facture.aggregate([
      {
        $addFields: {
          DATCREA_date: {
            $dateFromString: {
              dateString: "$DATCREA",
              format: "%Y-%m-%d",
            },
          },
        },
      },
      {
        $match: {
          // NUMCOD: "ABATTOIR", // remove this filter later
          CODFAC: "C",
          DATCREA_date: { $gt: new Date("2017-01-01T00:00:00Z") },
        },
      },
      {
        $project: {
          // DATCREA_date: 0, // Optional: to exclude the additional field from the results
          NUMCOM: 1,
          NUMFAC: 1,
          DATCREA: 1,
          NUMCOD: 1,
          HT: 1,
          MODREG: 1,
        },
      },
      {
        $sort: {
          DATCREA: -1
        },
      }
      // {
      //   $limit: 30,
      // }
    ]);
  
    res.status(200).json(factures);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

// @route   GET /api/facture/:id
// @desc    get one facture record
// @access  authenticated supervisor
const getFacture = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "id non valid!" });
  }

  try {
    const facture = await Facture.findById(id);
  
    if (!facture) {
      return res.status(400).json({ error: "Aucune facture ne correspond!" });
    }
  
    res.status(200).json(facture);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

// @route   GET /api/facture/select
// @desc    get select options in facture list page
// @access  authenticated supervisor
const getFactureSelectFields = async (req, res) => {
  try {
    const MODREG = await Facture.find({}).distinct('MODREG')

    res.status(200).json(MODREG);
  } catch (error) { // catching on multiple await statements
    res.status(400).json({ error: error.message })
  }
};

module.exports = {
  getFacture,
  getFactures,
  getFactureSelectFields,
};
