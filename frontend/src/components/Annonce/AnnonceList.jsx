// -- ce Tableau va etre implimenter dans la fiche client

import { useState } from "react";
import React from "react";
// import { useGetAnnoncesQuery } from "../../features/annonce/annonceApi";
// import { useGetCiviliteAnnoncesQuery } from "../../features/annonce/annonceApi";
import { useGetAnnoncesQuery } from "../../features/annonce/annonceApi";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination, {
  tablePaginationClasses,
} from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { styled } from "@mui/material/styles";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { LinearProgress } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    numeric: false,
    disablePadding: true,
    label: "Client",
  },
  {
    numeric: false,
    disablePadding: false,
    label: "N° annonce",
  },
  {
    numeric: false,
    disablePadding: false,
    label: "Date annonce",
  },
  {
    numeric: false,
    disablePadding: false,
    label: "Moyen",
  },
  {
    numeric: false,
    disablePadding: false,
    label: "Eleveur",
  },
  {
    numeric: false,
    disablePadding: false,
    label: "Adresse",
  },
  {
    numeric: false,
    disablePadding: false,
    label: "Commercial",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Annonce
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  // const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data: annonces, isLoading } = useGetAnnoncesQuery({
    DATE_D: props.date_d,
    DATE_F: props.date_f,
    CLE: props.cle,
    RACE: props.race,
  });
  console.log("data : ", annonces);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = annonces.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event) => {
    handleChangePage(event.target.value);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - annonces.length) : 0;

  const visibleRows = React.useMemo(() => {
    if (!annonces) {
      return []; // Return an empty array or any other default value if annonces is undefined
    }

    return stableSort(annonces, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [annonces, order, orderBy, page, rowsPerPage]);

  const firstNonEmpty = (ADR0, ADR1, ADR2) => {
    if (ADR0) return ADR0;
    if (ADR1) return ADR1;
    if (ADR2) return ADR2;
    return null; // Return null if all fields are empty
  };

  if (isLoading) {
    return <LinearProgress color="success" />;
  }
  // if (annonces) {
  //   annonces.map((n) => {
  //     const libs = n.libelles["0"];
  //     console.log(libs && libs.libelle);
  //   });
  // }
  return (
    <Box sx={{ margin: "auto", width: "70%" }}>
      <Paper sx={{ width: "%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer sx={{ height: 457 }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            stickyHeader
            aria-label="sticky table"
            size={"small"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={annonces.length}
            />
            <TableBody>
              {visibleRows.map((annonce, index) => {
                const isItemSelected = isSelected(annonce._id);
                const labelId = `enhanced-table-checkbox-${index}`;
                // const libs = annonce.libelles["0"];

                return (
                  <StyledTableRow
                    hover
                    onClick={(event) => handleClick(event, annonce._id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={annonce._id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <StyledTableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="center"
                    >
                      {annonce.DESIGNATION}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {annonce.NUM_ENREGIST}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {annonce.DATE_ANNONCE}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {annonce.MOYEN}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {annonce.NOM_A}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {firstNonEmpty(
                        annonce.ADRESSE[0],
                        annonce.ADRESSE[1],
                        annonce.ADRESSE[2]
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {annonce.CLE}
                    </StyledTableCell>
                    {/* <StyledTableCell align="right">
                      {new Date(annonce.DATCREAT).toLocaleDateString("fr-FR")}
                    </StyledTableCell> */}
                    {/* <StyledTableCell align="center">
                      <Checkbox
                        color="primary"
                        checked={annonce.ACTIF}
                        readOnly
                      />
                    </StyledTableCell> */}
                  </StyledTableRow>
                );
              })}
              {emptyRows > 0 && (
                <StyledTableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <StyledTableCell colSpan={6} />
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={annonces.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          showFirstButton={true}
          showLastButton={true}
          sx={{
            [`& .${tablePaginationClasses.spacer}`]: {
              display: "none",
            },
            [`& .${tablePaginationClasses.toolbar}`]: {
              justifyContent: "center",
            },
          }}
          ActionsComponent={() => {
            return (
              <Select
                value={page}
                onChange={handlePageChange}
                sx={{
                  marginLeft: "30px",
                }}
              >
                {Array.from(
                  { length: Math.ceil(annonces.length / rowsPerPage) },
                  (_, index) => (
                    <MenuItem key={index} value={index}>
                      {index + 1}
                    </MenuItem>
                  )
                )}
              </Select>
            );
          }}
        />
        {/* <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={annonces.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          showFirstButton={true}
          showLastButton={true}
        /> */}
      </Paper>
    </Box>
  );
}
