import { useGetCiviliteClientsQuery } from "../../features/client/clientApi";
import { LinearProgress } from "@mui/material";
import {
  DataGrid,
  frFR,
  GridFooterContainer,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridPagination,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";

// const lib = (rows) => {
//   rows.map((row) => {
//     const libs = row.libelles["0"];
//     return <li>{libs && libs.libelle}</li>;
//   });
// };

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
  // { field: "marquage", headerName: "Marquage", width: 130, type: "number" },
  // { field: "DATCREAT", headerName: "Date d'inscription", width: 150 },
  {
    field: "ADR0",
    headerName: "Adresses 1",
    width: 270,
  },
  {
    field: "ADR2",
    headerName: "Adresse 2",
    width: 270,
  },
  {
    field: "ADRLIV1",
    headerName: "Adresse 3",
    width: 270,
  },
  {
    field: "DATE_DERNIERE_FACTURE",
    headerName: "dérniére facture",
    width: 180,
  },
];

export function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

function CustomFooter() {
  return (
    <GridFooterContainer>
      <CustomPagination />
      <GridPagination />
    </GridFooterContainer>
  );
}
export default function ClientList() {
  const { data: clients, isLoading } = useGetCiviliteClientsQuery();

  if (clients) {
    console.log(clients);
  }
  if (isLoading) {
    return <LinearProgress color="success" />;
  }
  const fr = {
    ...frFR.components.MuiDataGrid.defaultProps.localeText,
  };
  return (
    <div style={{ height: 632, width: "100%" }}>
      <DataGrid
        rows={clients}
        columns={columns}
        localeText={{ ...fr }}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        checkboxSelection
        disableSelectionOnClick
        components={{
          Pagination: CustomFooter,
        }}
      />
      {/* <ul>
        {rows.map((row) => {
          const libs = row.libelles["0"];
          return <li>{libs && libs.libelle}</li>;
        })}
      </ul> */}
    </div>
  );
}
