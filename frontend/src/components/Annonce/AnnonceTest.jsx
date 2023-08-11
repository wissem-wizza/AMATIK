import { useGetAnnoncesQuery } from "../../features/annonce/annonceApi";
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
  { field: "DESIGNATION", headerName: "Client", width: 120 },
  {
    field: "NUM_ENREGIST",
    headerName: "N° annonce",
    width: 130,
    type: "number",
  },
  { field: "DATE_ANNONCE", headerName: "Date annonce", width: 200 },
  { field: "MOYEN", headerName: "Moyen", width: 130, type: "number" },
  { field: "NOM_A", headerName: "Eleveur", width: 150 },
  {
    field: "ADRESSE",
    headerName: "Commercial",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 270,
    valueGetter: (params) =>
      `${params.row.ADRESSE[0] || ""} ${params.row.ADRESSE[1] || ""} ${
        params.row.ADRESSE[2] || ""
      }`,
  },
  { field: "CLE", headerName: "Commercial", width: 130, type: "number" },
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
export default function DataTable(props) {
  const { data: annonces, isLoading } = useGetAnnoncesQuery({
    DATE_D: props.date_d,
    DATE_F: props.date_f,
    CLE: props.cle,
    RACE: props.race,
  });
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
        rows={annonces}
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
