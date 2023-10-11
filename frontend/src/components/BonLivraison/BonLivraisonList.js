import {
    useGetBonLivraisonsQuery,
    selectAllBonLivraisons,
    useGetBonLivraisonSelectFieldsQuery
} from "../../features/bonLivraison/bonLivraisonApi";
import withFilter from "../../hooks/withFilter";
import {
    formatNumberWithSpaces,
    parseDate,
    formatDate,
} from '../../utils/foramtting';



const getColumnsWithOptions = (MODE) => {
    return []
};

const columns = [
    {
        field: "Num_BL",
        headerName: "N° BL",
        width: 80,
        type: "number",
        align: "left",
        headerAlign: "left",
        valueFormatter: (params) => formatNumberWithSpaces(params.value),
    },
    {
        field: "DATE_LIV",
        headerName: "Date livraison",
        width: 120,
        type: "date",
        valueGetter: (params) => parseDate(params.row.DATE_LIV, '-'),
        valueFormatter: (params) => formatDate(params.value),
        // renderCell: ({value}) => {
        //     value = formatDate(value);
        //     const year = value.getFullYear();
        //     const month = value.getMonth() + 1; // Months are zero-indexed, so we add 1
        //     const day = value.getDate();

        //     const formattedDate = `${year}-${month}-${day}`;
        //     console.log(formattedDate); // Output: e.g., "2023-10-06"
        //     return <p>{formattedDate}</p>
        // }
    },
    {
        field: "ESPECE",
        headerName: "Espèce",
        width: 80,
        type: "singleSelect",
        valueOptions: [],
    },
    // {
    //     field: "Regroupement",
    //     headerName: "Regroupement",
    //     width: 150,
    // },
    {
        field: "Designation",
        headerName: "Désignation",
        width: 220,
        type: "singleSelect",
        valueOptions: [],
    },
    {
        field: "NB_Betes",
        headerName: "N° bêtes",
        width: 80,
        type: "number",
        align: "center"
    },
    {
        field: "Poids",
        headerName: "Poids",
        width: 90,
        type: "number",
    },
    {
        field: "Eleveur",
        headerName: "Eleveur",
        width: 180,
        flex: 1,
    },
    {
        field: "SITE",
        headerName: "Site",
        width: 120,
        type: "singleSelect",
        valueOptions: [],
    },
    {
        field: "Chauffeur",
        headerName: "Chauffeur",
        width: 120,
        type: "singleSelect",
        valueOptions: [],
    },
    {
        field: "Vehicule",
        headerName: "Véhicule",
        width: 100,
        type: "singleSelect",
        valueOptions: [],
    },
]


const BonLivraisonList = () => {

    const FilteredBonLivraison = withFilter({
        mainQueryHook: useGetBonLivraisonsQuery,
        dataSelection: selectAllBonLivraisons,
        // optionsQueryHook: useGetBonLivraisonSelectFieldsQuery,
        // getColumnsWithOptions,
        columns,
        route: 'bon_livraison',
        listToForm: false,
    });

    return <FilteredBonLivraison />
}

export default BonLivraisonList