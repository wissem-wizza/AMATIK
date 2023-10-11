import { useState, Fragment } from "react";
import {
  useGetTransportsQuery,
  useGetTransportSelectFieldsQuery,
  selectAllTransports,
} from "../../features/transport/extendedTransportApi";
import withFilter from "../../hooks/withFilter";
import {
  formatNumberWithSpaces,
  parseDate,
  formatDate,
} from "../../utils/foramtting";
import TransportDelete from "./TransportDelete";
import { days } from "./formData";

const getColumnsWithOptions = (data) => {
  const { IMMATRICULATION, CHAUFFEUR, DESIGNATION } = data;
  return [
    {
      field: "NUM_ORDRE",
      headerName: "N° de Transport",
      width: 150,
      type: "number",
      align: "center",
      valueFormatter: (params) => formatNumberWithSpaces(params.value),
    },
    {
      field: "DESIGNATION",
      headerName: "Site",
      width: 140,
      type: "singleSelect",
      valueOptions: DESIGNATION.map((site) => site.label),
    },
    {
      field: "IMMATRICULATION",
      headerName: "Immatriculation",
      width: 140,
      type: "singleSelect",
      valueOptions: IMMATRICULATION.map((imm) => imm.value),
    },
    {
      field: "CHAUFFEUR",
      headerName: "Chauffeur",
      width: 120,
      type: "singleSelect",
      valueOptions: CHAUFFEUR.map((chauffeur) => chauffeur.value),
    },
    {
      field: "DATE_TRANS",
      headerName: "Date de Transfert",
      width: 150,
      type: "date",
      align: "center",
      valueGetter: (params) => parseDate(params.row.DATE_TRANS, "-"),
      valueFormatter: (params) => formatDate(params.value),
    },
    {
      field: "SEMAINE",
      headerName: "Semaine",
      width: 100,
      type: "number",
      align: "center",
    },
    {
      field: "JOUR_SEMAINE",
      headerName: "Jour",
      width: 150,
      type: "singleSelect",
      valueOptions: days,
    },
    {
      field: "NB_DETAIL",
      headerName: "Détails",
      width: 70,
      type: "number",
      align: "center",
    },
    // { field: 'ETAT_TRANSFERT', headerName: 'État', width: 70,
    //     renderCell: (params) => params.value ? <ThumbDownAltOutlinedIcon/> : <ThumbUpAltOutlinedIcon/>,
    //     type: 'singleSelect',
    //     valueOptions: [0, 1]
    // },
    {
      field: "ETAT_TRANSFERT",
      headerName: "Statut",
      width: 120,
      type: "number",
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueFormatter: (params) => params.value === 0 ? "Non expédié" : "Expédié",
    },
    // {
    //     field: 'STATUT_TRANSFERT',
    //     headerName: 'Statut', width: 70,
    //     valueGetter: (params) => {
    //         if(!params.row.DATE_TRANS) return "Transporté" // temp code for old data
    //         return dayjs(params.row.DATE_TRANS) < dayjs().subtract(1, 'day') ? "Transporté" : "Pas Encore"
    //     },
    //     renderCell: (params) => params.value === "Transporté" ? <CheckCircle/> : <AccessTime/>,
    //     type: 'singleSelect',
    //     valueOptions: ["Transporté", "Pas Encore"],
    //     align: "center"
    // },
  ];
};

const TransportList = () => {
  // const { data: selectData, isLoading: isSelectDataLoading } = useGetTransportSelectFieldsQuery();

  // let [FilteredTransports, setFilteredTransports] = useState(() => () => null)
  
  const [ openDeletionDialog, setOpenDeletionDialog ] = useState(false)
  const [ transportToBeDeleted, setTransportToBeDeleted ] = useState({ NUM_ORDRE: null, _id: null })

  const deletableRow = (row) => {
    console.log("row", row)
    return row.ETAT_TRANSFERT === 0
  }

  const FilteredTransports = withFilter({
    mainQueryHook: useGetTransportsQuery,
    dataSelection: selectAllTransports,
    optionsQueryHook: useGetTransportSelectFieldsQuery,
    getColumnsWithOptions,
    route: "transport",
    setOpenDeletionDialog,
    getDataForRecordToDelete: setTransportToBeDeleted,
    deletableRow,
  });

  return (
    <Fragment>
      <FilteredTransports />
      {
        openDeletionDialog ?
        <TransportDelete
          open={openDeletionDialog}
          setOpen={setOpenDeletionDialog}
          numOrdre={transportToBeDeleted.NUM_ORDRE}
          id={transportToBeDeleted._id}
        />
        : null
      }
    </Fragment>
  );
};

export default TransportList;
