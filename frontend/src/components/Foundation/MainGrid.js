import { useContext } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import { createSvgIcon } from '@mui/material/utils';
import {
  DataGrid,
  frFR,
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

import { MainGridContext } from '../../hooks/withFilter'


export function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  const { customPaginationStyling } = useContext(MainGridContext);

  return (
    <Pagination
      color="success"
      count={pageCount}
      page={page + 1}
      onChange={(_, value) => apiRef.current.setPage(value - 1)}
      sx={{
        minWidth: "340px",
        ...customPaginationStyling
      }}
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
      <GridToolbarColumnsButton style={{ color: '#06603a' }} />
      <GridToolbarDensitySelector style={{ color: '#06603a' }} />
      {/* <GridToolbarExport style={{ color: '#06603a' }}/> */}
      <Button
        {...buttonBaseProps}
        style={{ color: '#06603a' }}
        onClick={() => handleExport()}
      >
        Telecharger
      </Button>
    </GridToolbarContainer>
  );
}

function CustomFooter() {

  const { sumRefs } = useContext(MainGridContext);

  return (
    <GridFooterContainer sx={{justifyContent: "flex-end"}}>
      {
        sumRefs.length > 0 ? sumRefs.map(({ current: { value, label, adornment } }, index) => (
          <TextField
            label={label}
            sx={{ m: 1, width: '15ch' }}
            color='success'
            InputProps={{
              startAdornment: <InputAdornment position="start">{adornment}</InputAdornment>,
            }}
            variant="filled"
            disabled
            value={value}
            key={index}
          />
        ))
        : null
      }
      <CustomPagination/>
      <GridPagination/>
    </GridFooterContainer>
  );
}

const CustomHeader = (props) => {
  return (
    <div>
      {props.column?.headerName}
    </div>
  );
};


const MainGrid = ({
  data,
  columns,
  setNewFilter,
  setSelectedRows,
  additionalStyling,
  rowsDensity: density
}) => {

  return (
    <DataGrid
      className="content-card"
      sx={{ height: 'auto', backgroundColor: 'white', ...additionalStyling }}
      autoheight 
      rows={data}
      // columns={columns}
      columns={columns.map((c) => {
        // if (i === columns.length - 1)
        //   return {...c, flex: 1}
        // return c
          return {...c, shrink: 1}
      })}
      getRowId={(row) => row._id}
      localeText={{ ...frFR.components.MuiDataGrid.defaultProps.localeText }}
      // slots={{ toolbar: CustomToolbar }}
      pageSizeOptions={[10, 25, 50]}
      // onRowSelectionModelChange={(ids) => {
      //   setSelectedRows(ids)
      // }}
      onRowSelectionModelChange={(rows) => setSelectedRows(rows)}
      density={density ?? 'compact'}
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
  );
}


MainGrid.propTypes = {
  sumRefs: PropTypes.arrayOf(
    PropTypes.shape({
      current: PropTypes.shape({
        value: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        adornment: PropTypes.string.isRequired,
      }).isRequired,
    })
  ),
};

export default MainGrid;