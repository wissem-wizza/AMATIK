import { useState, useEffect, useContext, createContext } from "react";
import PropTypes from "prop-types";
import {
  DataGrid,
  useGridApiContext,
  frFR,
  gridExpandedSortedRowIdsSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";

const getFilteredRows = ({ apiRef }) =>
  gridExpandedSortedRowIdsSelector(apiRef);

const FilterContext = createContext();

export function CustomPagination() {
  const apiRef = useGridApiContext();

  const setAutoFilteredData = useContext(FilterContext);

  useEffect(() => {
    setAutoFilteredData(getFilteredRows({ apiRef }));
  }, [setAutoFilteredData, apiRef]);

  return <Pagination />;
}

export default function FilterGrid({ data, columns, newFilter, setNewFilter }) {
  // 'filter' should has this for: { field: 'base_HT', operator: '<', value: 20 },

  const [autoFilteredData, setAutoFilteredData] = useState(
    data.map((row) => row._id)
  );

  useEffect(() => {
    const allDataGrids = document.querySelectorAll(".MuiDataGrid-main");
    if (allDataGrids.length > 1) {
      const dataGridParent = allDataGrids[1];
      const targetElement = dataGridParent.querySelector(
        ".MuiDataGrid-columnHeaders"
      );
      if (targetElement) {
        targetElement.style.display = "none";
      }
    }
  });

  useEffect(() => {
    if (autoFilteredData.length !== data.length) {
      setNewFilter((filter) => ({ ...filter, autoFilteredData }));
    }
  }, [autoFilteredData, data, setNewFilter]);

  return (
    <div>
      <FilterContext.Provider value={setAutoFilteredData}>
        <DataGrid
          // style={{ display: 'none' }}
          style={{
            // visibility: 'hidden',
            // position: 'absolute',
            // maxHeight: '0px'
            display: "none",
          }}
          rows={data}
          columns={columns}
          getRowId={(row) => row._id}
          pageSizeOptions={[10]}
          GridColDef={false}
          localeText={{
            ...frFR.components.MuiDataGrid.defaultProps.localeText,
          }}
          initialState={{
            filter: {
              filterModel: {
                items: [newFilter],
              },
            },
          }}
          components={{
            Pagination: CustomPagination,
          }}
        />
      </FilterContext.Provider>
    </div>
  );
}

FilterGrid.propTypes = {
  newFilter: PropTypes.shape({
    field: PropTypes.string.isRequired,
    operator: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
  }).isRequired,
};
