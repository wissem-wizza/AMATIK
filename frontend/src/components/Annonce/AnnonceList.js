import { Fragment, useState } from "react";
import { useSelector } from "react-redux";

import {
  useGetAnnoncesQuery,
  useGetAnnoncesByEleveurQuery,
  selectAllAnnonces,
  selectAllAnnoncesByEleveur,
  useGetAnnonceSelectFieldsQuery,
} from "../../features/annonce/extendedAnnonceApi";
import { selectCurrentUser } from '../../features/auth/authSlice';
import withFilter from "../../hooks/withFilter";

import {
  formatNumberWithSpaces,
  parseDate,
  formatDate,
  formatAddress
} from '../../utils/foramtting';
import EtatCell from "./EtatCell";
import AnnonceDelete from "./AnnonceDelete";


const moyenRenaming = (moyen) => moyen === "A Prendre" ? "À Collecter en Ferme" : "À Recevoir"

const getColumns = (type) => (selectFields) => {
  const { RACE, MOYEN, EtatAnnonce } = selectFields;
  return [
    // { field: "DESIGNATION", headerName: "Site", width: 120 },
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
      field: "RACE",
      headerName: "Espèce",
      width: 80,
      type: "singleSelect",
      valueOptions: RACE,
      flex: type === "Superviseur" ? "auto" : 1,
    },
    {
      field: "TOTAL", headerName: "N° Bêtes", width: 80, type: "number", align: "center",
      valueGetter: (params) => params.row.GROUPE?.TOTAL ?? 0,
    },
    {
      field: "MOYEN",
      headerName: "Moyen",
      type: "singleSelect",
      valueOptions: MOYEN.map(moyen => ({ value: moyen, label: moyenRenaming(moyen) })),
      width: 170,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => moyenRenaming(params.value),
      flex: type === "Superviseur" ? "auto" : 1,
    },
    { 
      field: "EtatAnnonce",
      headerName: "État",
      width: 150,
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
          type={type}
          MOYEN={params.row.MOYEN}
        />
      ),
    },
  ]
};

const supervisorColumns = [
  { field: "NOM", headerName: "Eleveur", width: 130 },
  // { field: "CLE", headerName: "Commercial", width: 130, type: "number",
  //   valueFormatter: (params) => formatNumberWithSpaces(params.value)
  // },
  {
    field: "ADRESSE",
    flex: 1,
    headerName: "Adresse",
    width: 270,
    valueGetter: (params) => formatAddress(params.row.ADRESSE, [2, 3]),
  },
]

// nested functions instead of 2 args, as 2nd function will be handled by withFilter hook
const getOrderedColumns = (type) => (selectFields) => {
  if(type === "Superviseur") {
    const [NUM_ENREGIST, ...restOfColumns] = getColumns(type)(selectFields)
    return [NUM_ENREGIST, ...supervisorColumns, ...restOfColumns]
  }
  return getColumns('Eleveur')(selectFields)
}

const etatIndex = (type) => 
  getOrderedColumns(type)({MOYEN: [], RACE: [], EtatAnnonce: []})
    .findIndex(column => column.field === "EtatAnnonce") + 1


export default function AnnonceList() {

  const { type, eleveur_id } = useSelector(selectCurrentUser);
  const [ openDeletionDialog, setOpenDeletionDialog ] = useState(false)
  const [ annonceToBeDeleted, setAnnonceToBeDeleted ] = useState({ NUM_ENREGIST: null, _id: null })

  const deletableRow = (row) => {
    return row.EtatAnnonce === "en cours"
  }

  const FilteredAnnonce = withFilter({
    ...(type === "Superviseur" ? {
      mainQueryHook: useGetAnnoncesQuery,
      dataSelection: selectAllAnnonces,
      listToForm: false,
    } : {
      mainQueryHook: useGetAnnoncesByEleveurQuery,
      eleveur_id,
      dataSelection: selectAllAnnoncesByEleveur,
      setOpenDeletionDialog,
      getDataForRecordToDelete: setAnnonceToBeDeleted,
      deletableRow,
    }),
    optionsQueryHook: useGetAnnonceSelectFieldsQuery,
    getColumnsWithOptions: getOrderedColumns(type),
    title: 'Consultation des annonces',
    route: 'annonce',
    additionalStyling: {
      [`.MuiDataGrid-withBorderColor[aria-colindex="${etatIndex(type)}"]
      .MuiDataGrid-columnHeaderTitleContainer`]: {
        marginLeft: "-1.2rem",
      }
    },
  });

  return (
    <Fragment>
      <FilteredAnnonce />
      <AnnonceDelete
        open={openDeletionDialog}
        setOpen={setOpenDeletionDialog}
        numAnnonce={annonceToBeDeleted.NUM_ENREGIST}
        id={annonceToBeDeleted._id}
      />
    </Fragment>
  )
}
