export const formFields = ["poids", "type", "date", "semaine"];


// to fill other fields
export const ovinsCategories = ['agneaux', 'beliers', 'brebis'];
export const ovinsWeights = ['Léger / Maigre', 'Moyen(ne)', 'Lourd / Bon(ne)'];
export const caprinsCategories = ["Chèvres", "Boucs"]

export const mapToDatabaseObject = (formInputs, natureList, dayjs) => {
    const mappedObject = {
        NUM_ENREGIST: formInputs.ID,
        DATE: dayjs(formInputs.date).format('YYYY-MM-DD').toString(),
        SEMAINE: formInputs.semaine,
        RACE: "LAINE",
        MOYEN: "Eux mêmes",
        EtatAnnonce: 'en cours',
        CLE: formInputs.CLE,
        NOM: formInputs.NOM,
        TYPE: natureList.findIndex(nature => nature.value === formInputs.type),
        eleveur_id: formInputs.eleveur_id,
        GROUPE: {},
    };

    // fill other fields
    mappedObject.GROUPE.OVINS = {
        AGNAUX: {
            NB_LG: 0,
            NB_MY: 0,
            NB_LR: 0,
            TOTAL: 0,
        }
    };
    mappedObject.GROUPE.OVINS.BELIERS = {
        NB_LG: 0,
        NB_MY: 0,
        NB_LR: 0,
        TOTAL: 0,
    };
    mappedObject.GROUPE.OVINS.BREBIES = {
        NB_LG: 0,
        NB_MY: 0,
        NB_LR: 0,
        TOTAL: 0,
    };
    mappedObject.GROUPE.OVINS.TOTAL = 0;
    mappedObject.GROUPE.CAPRINS = {
        NB_BOUCS: 0,
        NB_CHEVRES: 0,
        TOTAL: 0,
    };
    mappedObject.GROUPE.BOVINS = {
        TOTAL: 0
    };

    // this is the only one we need for "annonce laine"!!
    mappedObject.GROUPE.TOTAL = formInputs.poids

    return mappedObject;
};

export const mapToFormInputs = (databaseObject, dayjs, natureList) => {
    const formInputs = {
        ID: databaseObject.NUM_ENREGIST,
        date: dayjs(databaseObject.DATE)?.format("YYYY-MM-DD").toString(),
        semaine: databaseObject.SEMAINE,
        type: natureList[databaseObject.TYPE].value,
        CLE: databaseObject.CLE,
        NOM: databaseObject.NOM,
        poids: databaseObject.GROUPE?.TOTAL ?? 0,
    };

    return formInputs;
};