import { useGetEleveursQuery, selectAllEleveurs } from "../../features/eleveur/extendedEleveurApi";
import withFilter from '../../hooks/withFilter';

import {
  formatNumberWithSpaces,
  formatAddress
} from '../../utils/foramtting';


const columns = [
  { field: "CLE", headerName: "Code", width: 120,
    valueFormatter: (params) => formatNumberWithSpaces(params.value),
  },
  {
    field: "CHEPTEL",
    headerName: "Cheptel",
    width: 130,
    type: "number",
    align: "left",
    headerAlign: "left",
    // valueGetter: (params) => parseInt(params.row.CHEPTEL) || 99_999_999,
    valueFormatter: (params) => formatNumberWithSpaces(params.value),
  },
  { field: "NOM", headerName: "Nom", width: 150 },
  // { field: "marquage", headerName: "Marquage", width: 120, type: "number", // alt non numeric Clé eleveur
  //   valueFormatter: (params) => formatNumberWithSpaces(params.value) ?? params.value,
  // },
  {
    field: "ADRESSES_LIVRAISON",
    flex: 1,
    headerName: "Adresse de livraison",
    width: 270,
    valueGetter: (params) => formatAddress(params.row.ADRESSES_LIVRAISON, [1, 3]),
  },
  {
    field: "ADRESSES",
    flex: 1,
    headerName: "Adresse de facturation",
    width: 270,
    valueGetter: (params) => formatAddress(params.row.ADRESSES, [1, 3]),
  },
  { field: "TELEP", headerName: "Téléphone", width: 180, type: "number", headerAlign: "center" },
];

const EleveurList = () => {

  const FilteredEleveur = withFilter({
    mainQueryHook: useGetEleveursQuery,
    dataSelection: selectAllEleveurs,
    columns,
    additionalStyling: {
      '.MuiDataGrid-withBorderColor[data-field="TELEP"] .MuiDataGrid-cellContent': {
        whiteSpace: "pre",
        fontFamily: "'Courier New', monospace",
      },
      '&.css-1x51dt5-MuiInputBase-input-MuiInput-input': {
        backgroundColor: "yellow",
      },
    },
    route: "eleveur",
    deleteFeature: false,
  });

  return <FilteredEleveur />
}

export default EleveurList