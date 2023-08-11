import { useGetEleveursQuery } from "../../features/eleveur/eleveurApi";
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

const columns = [
  { field: "CLE", headerName: "Code", width: 120 },
  { field: "CHEPTEL", headerName: "Cheptel", width: 130, type: "number" },
  { field: "NOM", headerName: "Nom", width: 200 },
  { field: "marquage", headerName: "Marquage", width: 130, type: "number" },
  { field: "DATCREAT", headerName: "Date d'inscription", width: 150 },
  {
    field: "ADRESSES",
    headerName: "Adresse de facturation",
    width: 270,
  },
  { field: "TELEP", headerName: "Téléphone", width: 130, type: "number" },
  {
    field: "ADRESSES_LIVRAISON",
    headerName: "Adresse de livraison",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 270,
    valueGetter: (params) =>
      `${params.row.ADRESSES_LIVRAISON[0] || ""} ${
        params.row.ADRESSES_LIVRAISON[1] || ""
      } ${params.row.ADRESSES_LIVRAISON[2] || ""}`,
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
export default function DataTable() {
  const { data: rows, isLoading } = useGetEleveursQuery();
  if (isLoading) {
    return <LinearProgress color="success" />;
  }
  const fr = {
    ...frFR.components.MuiDataGrid.defaultProps.localeText,
    // footerRowSelected: CustomPagination,
  };
  return (
    <div style={{ height: 632, width: "100%" }}>
      <DataGrid
        rows={rows}
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
    </div>
  );
}
