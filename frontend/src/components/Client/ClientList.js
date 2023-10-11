import { useGetCiviliteClientsQuery, selectAllClients } from "../../features/client/extendedClientApi";
import withFilter from "../../hooks/withFilter";

import {
  formatAddress
} from '../../utils/foramtting';


const columns = [
  { field: "CLE", headerName: "Code", width: 120 },
  {
    field: "libelles", // You can choose any field name you want
    headerName: "Civilité",
    width: 100,
    valueGetter: (params) => {
      const libelles = params.row.libelles["0"]; // Get the libelles object
      const value = libelles && libelles.libelle; // Extract the value if it exists
      return value || ""; // Return the extracted value or an empty string
    },
  },
  { field: "NOM", headerName: "Nom", width: 206 },
  {
    field: "ADR",
    flex: 1,
    headerName: "Adresse Facturation",
    width: 270,
    valueGetter: (params) => formatAddress(params.row.ADR),
  },
  {
    field: "ADRLIV",
    flex: 1,
    headerName: "Adresse Liveraison",
    width: 270,
    valueGetter: (params) => formatAddress(params.row.ADRLIV),
  },
  {
    field: "DATE_DERNIERE_FACTURE",
    headerName: "dérniére facture",
    width: 180,
    align: "center",
    headerAlign: "center",
  },
];


export default function ClientList() {

  const FilteredTransports = withFilter({
    mainQueryHook: useGetCiviliteClientsQuery,
    dataSelection: selectAllClients,
    columns,
    route: 'client',
    deleteFeature: false,
})

return <FilteredTransports/>;
}
