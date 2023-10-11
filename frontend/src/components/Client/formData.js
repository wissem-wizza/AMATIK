export const formFields = [
    "civilité",
    "nom",
    "clé",
    "email",
    ["adr_fact_1", "adr_fact_2", "adr_fact_3"],
    ["adr_liv_1", "adr_liv_2", "adr_liv_3"],
    "telephone",
    "portable",
    "fax",
    "simoc",
    "agr_sanitaire",
    "siret",
    "reglement",
    "TVA",
    "COMPTE",
    "regime",
    "type",
]

export const type_client = ["Abatteur", "Stockeur", "Abattoir", "Virtuel", "Autre"];

export const reglementList = [
    {id: 1, value: 'CHEQUE'},
    {id: 4, value: 'CHEQUE 8 JOURS'},
    {id: 2, value: 'CHEQUE 21 JOURS'},
    {id: 3, value: 'CHEQUE 30 JOURS'},
    {id: 5, value: 'VIREMENT'},
    {id: 7, value: 'VIREMENT 8 JOURS'},
    {id: 6, value: 'VIREMENT 21 JOURS'},
]

export const regimeList = [
    { id: 1, value: 'Export' },
    { id: 2, value: 'Soumis TVA' },
    { id: 3, value: 'Soumis TVA 10' },
    { id: 4, value: 'Soumis TVA 5.5' },
    { id: 5, value: 'Soumis TVA 7' }
]

export const mapToDatabaseObject = formData => {
    const databaseObject = {
        TETE: formData.civilité,
        NOM: formData.nom,
        CLE: formData.clé,
        EMAIL: formData.email,
        TELEP: formData.telephone,
        portable: formData.portable,
        FAX: formData.fax,
        VACHM: formData.simoc,
        agr_sanitaire: formData.agr_sanitaire,
        SIRET: formData.siret,
        REGLEMENT: formData.reglement,
        TVA_intra: formData.TVA,
        COMPTE: formData.COMPTE,
        REGIME_TVA: formData.regime,
        type_client: type_client.indexOf(formData.type),
        ADR0: formData.adr_fact_1,
        ADR1: formData.adr_fact_2,
        ADR2: formData.adr_fact_3,
        ADRLIV0: formData.adr_liv_1,
        ADRLIV1: formData.adr_liv_2,
        ADRLIV2: formData.adr_liv_3,
    };

    return databaseObject;
}