export const formFields = [
    "civilité",
    "nom" ,
    "clé",
    "email",
    ["adr_fact_1", "adr_fact_2", "adr_fact_3"],
    ["adr_liv_1", "adr_liv_2", "adr_liv_3"],
    "siret",
    "TVA",
    "label",
    "CBANK",
    "GUICH",
    "COMPTE",
    "RIB",
];

export const labelEleveur = [
    {
        ABR: "L",
        DESIGNATION: "Label Rouge",
    },
    {
        ABR: "B",
        DESIGNATION: "Label Rouge Bio",
    },
    {
        ABR: "O",
        DESIGNATION: "Label Bio",
    },
    {
        ABR: "S",
        DESIGNATION: "Standard",
    },
];

export const mapToDatabaseObject = formData => {
    const mappedData = {
        "CLE": formData["clé"],
        "NOM": formData["nom"],
        "ADRESSES": [
            formData["adr_fact_1"],
            formData["adr_fact_2"],
            formData["adr_fact_3"]
        ],
        "ADRESSES_LIVRAISON": [
            formData["adr_liv_1"],
            formData["adr_liv_2"],
            formData["adr_liv_3"]
        ],
        "TETE": formData["civilité"],
        "email": formData["email"],
        "CBANK": formData["CBANK"],
        "GUICH": formData["GUICH"],
        "COMPTE": formData["COMPTE"],
        "RIB": formData["RIB"],
        "TVA_intra": formData["TVA"],
        "SIRET": formData["siret"],
        "label": formData["label"],
        "CHEPTEL": String(formData["numCheptel"]),
    };

    return mappedData;
}