const transportPipeline = (filter) => [
    {
        $match: filter,
    },
    {
        $lookup: {
            from: "site",
            localField: "CODE_SITE",
            foreignField: "CODE_SITE",
            as: "siteInfo",
        },
    },
    {
        $unwind: "$siteInfo",
    },
    {
        $project: {
            _id: 1,
            NUM_ORDRE: 1,
            NB_DETAIL: 1,
            IMMATRICULATION: 1,
            CHAUFFEUR: 1,
            // Include the 'DESIGNATION' field from the joined 'site' collection
            DESIGNATION: "$siteInfo.DESIGNATION",
            DATE_TRANS: 1,
            SEMAINE: 1,
            JOUR_SEMAINE: 1,
            ETAT_TRANSFERT: 1,
        },
    },
    { $sort: { NUM_ORDRE: -1 } },
]

module.exports = {
    transportPipeline,
}