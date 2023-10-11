const identificationPipelineWithFilter = (filter) => [
    {
        $match: filter,
    },
    {
        $lookup: {
            from: 'annonce',
            localField: 'NumAnnonce',
            foreignField: 'NUM_ENREGIST',
            as: 'annonceData'
        }
    },
    {
        $unwind: '$annonceData'
    },
    {
        $lookup: {
            from: 'eleveur',
            localField: 'CODE_ELEVEUR',
            foreignField: 'CLE',
            as: 'eleveurData'
        }
    },
    {
        $unwind: '$eleveurData'
    },
    {
        $match: {
            'annonceData.MOYEN': 'A Prendre',
            'annonceData.GROUPE': {$ne: null} // temp filter...
        }
    },
    {
        $project: {
            DATE_TOURNEE: 1, // only used for sorting
            NumAnnonce: 1,
            CODE_ELEVEUR: 1,
            NB_MOUT: 1,
            SERVICE: 1,
            SEMAINE: 1,
            nom_eleveur: '$NAISSEUR',
            NB_AGNAUX: '$annonceData.GROUPE.OVINS.AGNAUX.TOTAL',
            NB_BELIERS: '$annonceData.GROUPE.OVINS.BELIERS.TOTAL',
            NB_BREBIES: '$annonceData.GROUPE.OVINS.BREBIES.TOTAL',
            NB_CHEVRES: '$annonceData.GROUPE.CAPRINS.NB_CHEVRES',
            NB_BOUCS: '$annonceData.GROUPE.CAPRINS.NB_BOUCS',
            NB_BOVINS: '$annonceData.GROUPE.BOVINS.TOTAL',
            adr_eleveur: '$eleveurData.ADRESSES_LIVRAISON',
        }
    },
    {
        $sort: { DATE_TOURNEE: -1 } 
    },
]

module.exports = {
    identificationPipelineWithFilter
}