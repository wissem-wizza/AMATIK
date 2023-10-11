import { useGetFacturesQuery, selectAllFactures, useGetFactureSelectFieldsQuery } from "../../features/facture/extendedFactureApi";
import withFilter from "../../hooks/withFilter";
import {
  formatNumberWithSpaces,
  parseDate,
  formatDate,
} from '../../utils/foramtting';



const getColumnsWithOptions = (MODE) => {
  return [
    {
      field: "NUMFAC",
      headerName: "N° Facture",
      width: 130,
      type: "number",
      align: "left",
      headerAlign: "left",
      valueFormatter: (params) => formatNumberWithSpaces(params.value),
    },
    {
      field: "NUMCOM",
      headerName: "N° Commande",
      width: 120,
      type: "number",
      align: "left",
      headerAlign: "left",
      valueFormatter: (params) => formatNumberWithSpaces(params.value),
    },
    {
      field: "DATCREA",
      headerName: "Date commande",
      width: 200,
      type: "date",
      valueGetter: (params) => parseDate(params.row.DATCREA, '-'),
      valueFormatter: (params) => formatDate(params.value)
    },
    {
      field: "NUMCOD",
      headerName: "Nom",
      width: 200,
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    { field: "HT", headerName: "Montant HT", width: 130 },
    { field: "MODREG", headerName: "Mode", width: 220, type: "singleSelect", valueOptions: MODE },
]};


const FactureList = () => {

  

  const FilteredFacture = withFilter({
    mainQueryHook: useGetFacturesQuery,
    dataSelection: selectAllFactures,
    optionsQueryHook: useGetFactureSelectFieldsQuery,
    getColumnsWithOptions,
    route: 'abattage',
    listToForm: false,
  });

  return <FilteredFacture />
}

export default FactureList