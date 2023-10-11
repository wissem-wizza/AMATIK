export const formFields = ["espece", "date", "semaine", "type", "total"];
export const especeList = [
    {id: 1, value: 'Bovins'},
    {id: 2, value: 'Caprins'},
    {id: 3, value: 'Ovins'},
    // {id: 4, value: 'Viande'},
];
export const type_annonce = [
    { value: "A Prendre", label: "A collecter en ferme" },
    { value: "Eux mêmes", label: "Livraison directe" }
];
export const ovinsCategories = ['agneaux', 'beliers', 'brebis'];
export const ovinsWeights = ['Léger / Maigre', 'Moyen(ne)', 'Lourd / Bon(ne)'];
export const caprinsCategories = ["Chèvres", "Boucs"]

export const mapToDatabaseObject = (formInputs) => {
    const mappedObject = {
        NUM_ENREGIST: formInputs.ID,
        DATE: formInputs.date.format('YYYY-MM-DD'),
        SEMAINE: formInputs.semaine,
        RACE: formInputs.espece.toUpperCase(),
        MOYEN: formInputs.type,
        EtatAnnonce: 'en cours',
        CLE: formInputs.CLE,
        NOM: formInputs.NOM,
        eleveur_id: formInputs.eleveur_id,
        GROUPE: {}
    };

    formInputs.beliers0 = formInputs.beliers0 ?? 0
    formInputs.beliers1 = formInputs.beliers1 ?? 0
    formInputs.beliers2 = formInputs.beliers2 ?? 0
    formInputs.brebis0 = formInputs.brebis0 ?? 0
    formInputs.brebis1 = formInputs.brebis1 ?? 0
    formInputs.brebis2 = formInputs.brebis2 ?? 0
    formInputs.agneaux0 = formInputs.agneaux0 ?? 0
    formInputs.agneaux1 = formInputs.agneaux1 ?? 0
    formInputs.agneaux2 = formInputs.agneaux2 ?? 0

    formInputs.Boucs = formInputs.Boucs ?? 0
    formInputs.Chèvres = formInputs.Chèvres ?? 0


    const total_be = formInputs.beliers0 + formInputs.beliers1 + formInputs.beliers2
    const total_br = formInputs.brebis0 + formInputs.brebis1 + formInputs.brebis2
    const total_ag = formInputs.agneaux0 + formInputs.agneaux1 + formInputs.agneaux2

    mappedObject.GROUPE.OVINS = {
        AGNAUX: {
            NB_LG: formInputs.agneaux0,
            NB_MY: formInputs.agneaux1,
            NB_LR: formInputs.agneaux2,
            TOTAL: total_ag
        }
    };

    mappedObject.GROUPE.OVINS.BELIERS = {
        NB_LG: formInputs.beliers0,
        NB_MY: formInputs.beliers1,
        NB_LR: formInputs.beliers2,
        TOTAL: total_be
    };

    mappedObject.GROUPE.OVINS.BREBIES = {
        NB_LG: formInputs.brebis0,
        NB_MY: formInputs.brebis1,
        NB_LR: formInputs.brebis2,
        TOTAL: total_br
    };

    mappedObject.GROUPE.OVINS.TOTAL = total_ag + total_be + total_br;

    mappedObject.GROUPE.CAPRINS = {
        NB_BOUCS: formInputs.Boucs,
        NB_CHEVRES: formInputs.Chèvres,
        TOTAL: formInputs.Boucs + formInputs.Chèvres
    };

    // mappedObject.GROUPE.VIANDE = {
    //     TOTAL: mappedObject.RACE === "VIANDE" ? formInputs.total : 0
    // };

    mappedObject.GROUPE.BOVINS = {
        TOTAL: mappedObject.RACE === "BOVINS" ? formInputs.total : 0
    };

    mappedObject.GROUPE.TOTAL = formInputs.total

    return mappedObject;
};

export const mapToFormInputs = (databaseObject, dayjs) => {
    const capitalizeFirstLetter = (string) => {
        return (string?.charAt(0)?.toUpperCase() + string?.slice(1)?.toLowerCase()) || "";
    };
    const formInputs = {
        ID: databaseObject.NUM_ENREGIST,
        date: dayjs(databaseObject.DATE),
        semaine: databaseObject.SEMAINE,
        espece: capitalizeFirstLetter(databaseObject.RACE?.toLowerCase()),
        type: databaseObject.MOYEN,
        CLE: databaseObject.CLE,
        NOM: databaseObject.NOM,
        eleveur_id: databaseObject.eleveur_id,
        beliers0: databaseObject.GROUPE?.OVINS?.BELIERS?.NB_LG ?? 0,
        beliers1: databaseObject.GROUPE?.OVINS?.BELIERS?.NB_MY ?? 0,
        beliers2: databaseObject.GROUPE?.OVINS?.BELIERS?.NB_LR ?? 0,
        brebis0: databaseObject.GROUPE?.OVINS?.BREBIES?.NB_LG ?? 0,
        brebis1: databaseObject.GROUPE?.OVINS?.BREBIES?.NB_MY ?? 0,
        brebis2: databaseObject.GROUPE?.OVINS?.BREBIES?.NB_LR ?? 0,
        agneaux0: databaseObject.GROUPE?.OVINS?.AGNAUX?.NB_LG ?? 0,
        agneaux1: databaseObject.GROUPE?.OVINS?.AGNAUX?.NB_MY ?? 0,
        agneaux2: databaseObject.GROUPE?.OVINS?.AGNAUX?.NB_LR ?? 0,
        Boucs: databaseObject.GROUPE?.CAPRINS?.NB_BOUCS ?? 0,
        'Chèvres': databaseObject.GROUPE?.CAPRINS?.NB_CHEVRES ?? 0,
        total: databaseObject.GROUPE?.TOTAL ?? 0
    };

    return formInputs;
};
