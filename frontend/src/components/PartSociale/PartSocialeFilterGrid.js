import { useState, useEffect, useContext, createContext } from 'react';
import {
    DataGrid,
    useGridApiContext,
    gridExpandedSortedRowIdsSelector,
} from '@mui/x-data-grid';
import Pagination from "@mui/material/Pagination";

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

const getFilteredRows = ({ apiRef }) => gridExpandedSortedRowIdsSelector(apiRef);

const FilterContext = createContext();

export function CustomPagination() {
    const apiRef = useGridApiContext();

    const setAutoFilteredData = useContext(FilterContext);

    useEffect(() => {
        setAutoFilteredData(getFilteredRows({ apiRef }))
    }, [setAutoFilteredData, apiRef])

    return (
        <Pagination />
    );
}

export default function SencondExport({ data, newFilter, setNewFilter }) {
    // 'filter' should has this for: { field: 'base_HT', operator: '<', value: 20 },

    const [autoFilteredData, setAutoFilteredData] = useState(data.map(row => row._id))

    useEffect(() => {
        if (autoFilteredData.length !== data.length) {
            setNewFilter((filter) => ({ ...filter, autoFilteredData }))
        }
    }, [autoFilteredData, data, setNewFilter])


    return (
        <div>
            <FilterContext.Provider value={setAutoFilteredData}>
                <DataGrid
                    style={{ display: 'none' }}
                    rows={data}
                    columns={columns}
                    getRowId={(row) => row._id}
                    // slots={{ toolbar: CustomToolbar }}
                    pageSizeOptions={[10]}
                    GridColDef={false}
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
                        filter: {
                            filterModel: {
                                items: [newFilter],
                            },
                        },
                    }}
                    components={{
                        Pagination: CustomPagination
                    }}
                />
            </FilterContext.Provider>
        </div>
    );
}
