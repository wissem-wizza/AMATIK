const Facture = require("../models/factureModel");
const mongoose = require("mongoose");

//get all factures
const getFactures = async (req, res) => {
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
        NUMCOD: "ABATTOIR",
        CODFAC: "C",
        DATCREA_date: { $gt: new Date("2017-01-01T00:00:00Z") },
      },
    },
    {
      $project: {
        DATCREA_date: 0, // Optional: to exclude the additional field from the results
      },
    },
    // {
    //   $count: "totalCount",
    // },
  ]);

  // const factures = await Facture.aggregate([
  //   {
  //     $match: {
  //       NUMCOD: "ABATTOIR",
  //       CODFAC: "C",
  //       DATCREA: {
  //         $gt: [
  //           { $dateFromString: { dateString: "$DATCREA", format: "%Y-%m-%d" } },
  //           ISODate("2017-01-01T00:00:00Z"),
  //         ],
  //         // $gte: { $dateFromString: { dateString: "2017-01-01" } },
  //         // $lt: { $dateFromString: { dateString: "2022-01-01" } },
  //       },
  //     },
  //   },
  //   // {
  //   //   $project: {
  //   //     _id: 1,
  //   //     NUMCOD: 1,
  //   //     CODFAC: 1,
  //   //     DATCREA: 1,
  //   //     NUMREP: 1,
  //   //   },
  //   // },
  // ]);

  res.status(200).json(factures);
};

//get a single facture
const getFacture = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "id non valid!" });
  }
  const facture = await Facture.findOne({ _id: id });

  if (!facture) {
    return res.status(400).json({ error: "Aucune facture ne correspond!" });
  }

  res.status(200).json(facture);
};

module.exports = {
  getFacture,
  getFactures,
};
