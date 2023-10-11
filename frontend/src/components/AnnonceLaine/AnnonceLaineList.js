import { Fragment, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";

import {
    useGetAnnoncesLaineQuery,
    useGetAnnoncesLaineByEleveurQuery,
    selectAllAnnoncesLaine,
    selectAllAnnoncesLaineByEleveur,
} from "../../features/annonce/AnnonceLaineApi";
import { selectCurrentUser } from '../../features/auth/authSlice';
import withFilter from "../../hooks/withFilter";
import AnnonceLaineForm from "../AnnonceLaineForm/AnnonceLaineForm";
import { useGetAnnonceLaineByIdQuery } from "../../features/annonce/AnnonceLaineApi";
import { useGetParametresDiversByIdQuery } from "../../features/parametres_divers/parametreDiversApi";
import {
    formatNumberWithSpaces,
    parseDate,
    formatDate,
    formatAddress
} from '../../utils/foramtting';
import EtatCell from "../Annonce/EtatCell";


const getColumns = ({ userType, selectFields }) => {
    const { TYPE, EtatAnnonce } = selectFields;
    return [
        {
            field: "NUM_ENREGIST",
            headerName: "N° annonce",
            width: 130,
            type: "number",
            align: "center",
            headerAlign: "center",
            valueFormatter: (params) => formatNumberWithSpaces(params.value),
        },
        {
            field: "DATE_ANNONCE",
            headerName: "Date annonce",
            width: 140,
            type: "date",
            align: "center",
            valueGetter: (params) => parseDate(params.row.DATE_ANNONCE, '-', [0, 1, 2]),
            valueFormatter: (params) => formatDate(params.value)
        },
        {
            field: "TOTAL", headerName: "Poids", width: 80, type: "number", align: "center",
            valueGetter: (params) => params.row.GROUPE?.TOTAL ?? 0,
        },
        {
            field: "TYPE",
            headerName: "Type de laine",
            type: "singleSelect",
            valueFormatter: (params) => {
                return TYPE[params.value]?.value?.toLowerCase()
            },
            valueOptions: TYPE.map(type => {
                return { value: type.value, label: type.value.toLowerCase() }
            }),
            // width: 220,
            align: 'center',
            headerAlign: "center",
            flex: 1,
        },
        {
            field: "EtatAnnonce",
            headerName: "État",
            minWidth: 140,
            type: "singleSelect",
            align: "center",
            headerAlign: "center",
            valueOptions: EtatAnnonce,
            renderCell: (params) => (
                <EtatCell
                    key={params.id}
                    value={params.row.EtatAnnonce}
                    valueOptions={EtatAnnonce.filter(etat => etat !== "en cours")}
                    numAnnonce={params.row.NUM_ENREGIST}
                    ID={params.row._id}
                    type={userType}
                />
            ),
        },
    ]
};

const supervisorColumns = [
    { field: "NOM", headerName: "Eleveur", width: 180 },
    {
        field: "ADRESSE",
        headerName: "Adresse",
        width: 270,
        valueGetter: (params) => formatAddress(params.row.ADRESSE, [2, 3]),
    },
]

// nested functions instead of 2 args, as 2nd arg is handled by withFilter hook
const getOrderedColumns = ({ userType, selectFields }) => {
    if (userType === "Superviseur") {
        const [NUM_ENREGIST, ...restOfColumns] = getColumns({ userType: 'Superviseur', selectFields })
        return [NUM_ENREGIST, ...supervisorColumns, ...restOfColumns]
    }
    return getColumns({ userType: 'Eleveur', selectFields })
}

const etatIndex = (type) =>
    getOrderedColumns({userType: type, selectFields: { TYPE: [], EtatAnnonce: [] }})
        .findIndex(column => column.field === "EtatAnnonce") + 1


export default function AnnonceList() {

    const { type, eleveur_id } = useSelector(selectCurrentUser);
    const [open, setOpen] = useState(false);
    const [formDialogState, setFormDialogState] = useState(null)
    const [nouvelle, setNouvelle] = useState(true)
    const [rowToEdit, setRowToEdit] = useState(null)
    const [formStateChanged, setFormStateChanged] = useState(false)

    const loaderData = useLoaderData()

    useEffect(() => {
        if(!formStateChanged && formDialogState !== null) {
            setNouvelle(formDialogState === 'ajouter')
            setFormStateChanged(true)
        }
    }, [formDialogState, formStateChanged])

    const FilteredAnnonce = withFilter({
        ...(type === "Superviseur" ? {
            mainQueryHook: useGetAnnoncesLaineQuery,
            dataSelection: selectAllAnnoncesLaine,
            listToForm: false,
        } : {
            mainQueryHook: useGetAnnoncesLaineByEleveurQuery,
            eleveur_id,
            dataSelection: selectAllAnnoncesLaineByEleveur,
            dialogForm: true,
            openFormDialog: () => setOpen(true),
            setFormDialogState,
            setRowToEdit,
        }),
        columns: getOrderedColumns({userType: type, selectFields: loaderData}),
        title: 'Consultation des annonces Laine',
        route: 'annonce_laine',
        additionalStyling: {
            [`.MuiDataGrid-withBorderColor[aria-colindex="${etatIndex(type)}"]
            .MuiDataGrid-columnHeaderTitleContainer`]: {
                marginLeft: "-1.2rem",
            }
        },
    });

    return (
        <Fragment>
            {
                (open && formStateChanged) ?
                <AnnonceLaineForm
                    open={open}
                    setOpen={setOpen}
                    natureList={loaderData.TYPE}
                    rowToEdit={rowToEdit}
                    formQuery={
                        nouvelle ?
                        useGetParametresDiversByIdQuery :
                        useGetAnnonceLaineByIdQuery
                    }
                    arg={nouvelle ? 99 : rowToEdit}
                    nouvelle={nouvelle}
                    setFormStateChanged={setFormStateChanged}
                    setFormDialogState={setFormDialogState}
                    key={nouvelle} // so it will reset each time "nouvelle" changes
                />
                : null
            }
            <FilteredAnnonce />
        </Fragment>
    )
}
