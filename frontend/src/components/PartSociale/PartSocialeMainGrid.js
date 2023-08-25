import { createContext, useContext, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import { createSvgIcon } from '@mui/material/utils';
import {
  DataGrid,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  gridPageCountSelector,
  GridFooterContainer,
  GridPagination,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';
import { TextField, InputAdornment } from '@mui/material';
import Pagination from "@mui/material/Pagination";

const CumulativeValuesContext = createContext();


export function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(_, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const ExportIcon = createSvgIcon(
  <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
  'SaveAlt',
);

function CustomToolbar() {

  const apiRef = useGridApiContext();

  const buttonBaseProps = {
    color: 'primary',
    size: 'small',
    startIcon: <ExportIcon />,
  };

  const handleExport = (options) => {
    // for options will be uhndefined, so selected rows set by default
    return apiRef.current.exportDataAsCsv(options)
  };

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton style={{ color: '#9C1F08' }} />
      <GridToolbarDensitySelector style={{ color: '#9C1F08' }} />
      {/* <GridToolbarExport style={{ color: '#9C1F08' }}/> */}
      <Button
          {...buttonBaseProps}
          style={{ color: '#9C1F08' }}
          onClick={() => handleExport()}
      >
          Current page rows
      </Button>
    </GridToolbarContainer>
  );
}

function CustomFooter() {

  const { bast_HT_sum, totalPrelevement } = useContext(CumulativeValuesContext);

  return (
    <GridFooterContainer>
      <TextField
          label="Total base ht"
          id="filled-start-adornment"
          sx={{ m: 1, width: '15ch' }}
          InputProps={{
              startAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
          variant="filled"
          disabled
          value={bast_HT_sum.current}
      />
      <TextField
          label="Total prélèvement"
          id="filled-start-adornment"
          sx={{ m: 1, width: '15ch' }}
          InputProps={{
              startAdornment: <InputAdornment position="start">∑</InputAdornment>,
          }}
          variant="filled"
          disabled
          value={totalPrelevement.current}
      />
      <CustomPagination />
      <GridPagination />
    </GridFooterContainer>
  );
}

const columns = [
  { field: "datop", headerName: "Date Opération", width: 170 },
  {
    field: "base_HT",
    headerName: "Base HT",
    width: 170,
    type: 'number',
  },
  { field: "preleve", headerName: "Prélèvement", width: 120 },
  { field: "comfou", headerName: "Commande Fournisseur", width: 200 },
  {
    field: "factureData",
    headerName: "N° Facture",
    width: 100,
    valueGetter: (params) => {
      const facture = params.row.factureData;
      const value = facture && facture.NUMFAC;
      return value || "";
    },
  },
  {
    field: "eleveurData",
    headerName: "Eleveur",
    width: 120,
    valueGetter: (params) => {
      const eleveur = params.row.eleveurData;
      const value = eleveur && eleveur.NOM;
      return value || "";
    },
  },
];

const CustomHeader = (props) => {
  return (
    <div>
      {props.column?.headerName}
    </div>
  );
};

export default function Export({ data, setNewFilter }) {
  
  const bast_HT_sum = useRef(0)
  const totalPrelevement = useRef(0)

  useEffect(() => {
    let temp_bast_HT_sum = 0;
    let temp_totalPrelevement = 0;
    data.forEach(row => {
      temp_bast_HT_sum += row.base_HT
      temp_totalPrelevement += row.preleve
    });
    bast_HT_sum.current = parseFloat(temp_bast_HT_sum.toFixed(2));
    totalPrelevement.current = temp_totalPrelevement
    // console.log("sum", bast_HT_sum, "prelevement", totalPrelevement)
  }, [data])

  return (
      <CumulativeValuesContext.Provider value={{bast_HT_sum, totalPrelevement}}>
        <DataGrid
          style={{height: 'auto'}}
          rows={data}
          columns={columns}
          getRowId={(row) => row._id}
          // slots={{ toolbar: CustomToolbar }}
          pageSizeOptions={[10]}
          checkboxSelection
          // onRowSelectionModelChange={(ids) => {
          //   setSelectedRows(ids)
          // }}
          density='compact'
          GridColDef={false}
          onFilterModelChange={(o) => {
            if (o.items.length !== 0) {
              if (o.items[0].value) {
                setNewFilter(o.items[0])
              }
            }
          }}
          // initialState={{
          //     ...data.initialState,
          //     pagination: {
          //         ...data.initialState?.pagination,
          //         paginationModel: {
          //             pageSize: 10,
          //         },
          //     },
          // }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          components={{
            toolbar: CustomToolbar,
            Footer: CustomFooter,
            Header: CustomHeader,
            // Pagination: CustomPagination
          }}
        />
      </CumulativeValuesContext.Provider>
  );
}
