import { useGetFacturesQuery } from "../features/facture/factureApi";
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
  { field: "NUMCOM", headerName: "N° Commande", width: 120, type: "number" },
  { field: "NUMFAC", headerName: "N° Facture", width: 130, type: "number" },
  { field: "DATCREA", headerName: "Date commande", width: 200 },
  {
    field: "NUMREP",
    headerName: "Nom",
    width: 270,
  },
  { field: "HT", headerName: "Montant HT", width: 130 },
  { field: "NUMREP", headerName: "Commercial", width: 200 },
  // {
  //   field: "ADRESSES_LIVRAISON",
  //   headerName: "État",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 270,
  //   valueGetter: (params) =>
  //     `${params.row.ADRESSES_LIVRAISON[0] || ""} ${
  //       params.row.ADRESSES_LIVRAISON[1] || ""
  //     } ${params.row.ADRESSES_LIVRAISON[2] || ""}`,
  // },
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
export default function FactureClient() {
  const { data: factures, isLoading } = useGetFacturesQuery();
  if (isLoading) {
    return <LinearProgress color="success" />;
  }
  const fr = {
    ...frFR.components.MuiDataGrid.defaultProps.localeText,
    // footerRowSelected: CustomPagination,
  };
  return (
    <div style={{ height: 380, width: "65%" }}>
      <DataGrid
        rows={factures}
        columns={columns}
        localeText={{ ...fr }}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        disableSelectionOnClick
        components={{
          Pagination: CustomFooter,
        }}
      />
    </div>
  );
}
