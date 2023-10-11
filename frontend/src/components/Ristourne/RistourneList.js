import { useSelector } from "react-redux";
import {
    useGetRistournesQuery,
    useGetRistournesByEleveurQuery,
    selectAllRistournes,
    selectAllRistournesByEleveur,
} from "../../features/ristourne/extendedRistourneApi";
import { selectCurrentUser } from '../../features/auth/authSlice';
import withFilter from "../../hooks/withFilter";

import {
    formatNumberWithSpaces,
} from '../../utils/foramtting';


const columns = [
    {
        field: "NUMCOMA",
        headerName: "N° Commande",
        type: "number",
        width: 120,
        align: "left",
        headerAlign: "left",
        valueFormatter: (params) => formatNumberWithSpaces(params.value),
    },
    {
        field: "NUMFACA",
        headerName: "N° Facture",
        // width: 130,
        type: "number",
        align: "left",
        headerAlign: "left",
        flex: 1,
        valueFormatter: (params) => formatNumberWithSpaces(params.value),
    },
    {
        field: "QCOM",
        headerName: "Quantité",
        width: 120,
        type: "number",
        align: "center",
        headerAlign: "center",
    },
    {
        field: "PU_ACH", headerName: "Prix Unitaire", width: 120, type: "number",
    },
    {
        field: "PTOT_ACH", headerName: "Prix Total", width: 130, type: "number",
    },
    {
        field: "ANNA",
        headerName: "Année",
        width: 100,
        type: "number",
        align: "center",
        headerAlign: "center",
        valueFormatter: (params) => params.value,
    },
];
const supervisorColumns = [
    {
        field: "CLE",
        headerName: "Clé Eleveur",
        width: 130,
        type: "number",
        align: "left",
        headerAlign: "left",
        valueFormatter: (params) => formatNumberWithSpaces(params.value)
    },
    { field: "NOM", headerName: "Eleveur", flex: 1 },
    // {
    //     field: "CHEPTEL", headerName: "N° Cheptel", width: 130, type: "number",
    //     valueFormatter: (params) => formatNumberWithSpaces(params.value),
    // },
]

const getOrderedColumns = (type) => {
    if(type === "Superviseur") {
        const [Commande, Facture, ...restOfColumns] = columns
        return [Commande, Facture, ...supervisorColumns, ...restOfColumns]
    }
    return columns
}


export default function RistourneList() {

    const { type, eleveur_id } = useSelector(selectCurrentUser);

    const FilteredRistourne = withFilter({
        ...(type === "Eleveur" ?
            {
                mainQueryHook: useGetRistournesByEleveurQuery,
                dataSelection: selectAllRistournesByEleveur,
                eleveur_id,
                // customWidth: '50rem',
                customPaginationStyling: {minWidth: 'auto'},
                rowsDensity: 'standard'
            } :
            {
                mainQueryHook: useGetRistournesQuery,
                dataSelection: selectAllRistournes,
            }
        ),
        columns: getOrderedColumns(type),
        title: 'Consultation des ristournes',
        route: 'ristourne',
        listToForm: false,
    });

    return <FilteredRistourne />
}
