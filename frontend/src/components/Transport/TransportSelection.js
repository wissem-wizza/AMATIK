import { useState, useEffect, useContext } from 'react';
import { Box, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import styled from 'styled-components';

import TransportFormControl from './TransportFormControl';
import { CustomFormContext } from './TransportForm';


// Define a custom style for the DataGrid
const CustomDataGrid = styled(DataGrid)`
    .MuiDataGrid-cellContent {
        font-size: 0.7rem; /* Adjust the font size as needed */
    }
`;

const columns = [
    // {
    //     field: "SEMAINE",
    //     flex: 1,
    //     headerName: "S",
    //     type: 'number',
    //     maxWidth: 40,
    // },
    {
        field: "NumAnnonce",
        headerName: "N° Annonce",
        type: 'number',
        width: 100,
    },
    {
        field: "nom_eleveur",
        flex: 1,
        headerName: "Eleveur",
        type: 'string',
        width: 80,
    },
    // {
    //     field: "adr_eleveur",
    //     flex: 1,
    //     headerName: "Adresse",
    //     type: 'string',
    //     minWidth: 120,
    //     description: "This column has a value getter and is not sortable.",
    //     sortable: false,
    //     valueGetter: (params) =>
    //         `${params.row.adr_eleveur[2] || ""} ${
    //         params.row.adr_eleveur[1] || ""
    //         }`,
    // },
    {
        field: "NB_AGNAUX",
        headerName: "Ag",
        type: 'number',
        maxWidth: 40,
    },
    {
        field: "NB_BELIERS",
        headerName: "Be",
        type: 'number',
        maxWidth: 40,
    },
    {
        field: "NB_BREBIES",
        headerName: "Br",
        type: 'number',
        maxWidth: 40,
    },
    {
        field: "NB_CHEVRES",
        headerName: "Ch",
        type: 'number',
        maxWidth: 45,
    },
    {
        field: "NB_BOUCS",
        headerName: "Bc",
        type: 'number',
        maxWidth: 40,
    },
    {
        field: "NB_BOVINS",
        headerName: "Bv",
        type: 'number',
        maxWidth: 40,
    },
    {
        field: "NB_MOUT",
        headerName: "Total",
        type: 'number',
        maxWidth: 60,
        // valueGetter: (params) =>
        //     params.row.NB_AGNAUX +
        //     params.row.NB_BELIERS +
        //     params.row.NB_BREBIES +
        //     params.row.NB_CHEVRES +
        //     params.row.NB_BOUCS,
    },
    {
        field: "DATE_TOURNEE", // hidden column .. only used for sorting
        headerName: "Date",
        type: 'string',
    },
    // {
    //     field: "CODE_SITE",
    //     flex: 1,
    //     headerName: "Site",
    //     type: 'string',
    //     MaxWidth: 40,
    //     MinWidth: 40,
    // },
]

const AnnonceSelection = () => {

    const [selectedRowAvailableId, setSelectedRowAvailableId] = useState(null);
    const [selectedRowAvailable, setSelectedRowAvailable] = useState();

    const [selectedRowToTransportId, setSelectedRowToTransportId] = useState(null);
    const [selectedRowToTransport, setSelectedRowToTransport] = useState();

    const {
        availableAnnonceList,
        toTransportAnnonceList,
    } = useContext(CustomFormContext);

    useEffect(() => {
        let x = availableAnnonceList.find(annonce => annonce._id === selectedRowAvailableId)
        setSelectedRowAvailable(x)
    }, [availableAnnonceList, selectedRowAvailableId])

    useEffect(() => {
        let x = toTransportAnnonceList.find(annonce => annonce._id === selectedRowToTransportId)
        setSelectedRowToTransport(x)
    }, [toTransportAnnonceList, selectedRowToTransportId])

    return (
        <Box sx={{ flexGrow: 1, marginBottom: "2rem" }}>
            <Grid container justifyContent="space-around" spacing={1} wrap='nowrap'>
                <Grid item xs style={{minWidth: '480px', maxHeight: '320px', flex: 1}}>
                    <CustomDataGrid
                        rows={toTransportAnnonceList}
                        getRowId={(row) => row._id}
                        columns={columns}
                        columnVisibilityModel={{DATE_TOURNEE: false}}
                        initialState={{ // got to be on DATE_TOURNEE but it has not a column
                            sorting: { // add num .. https://mui.com/x/react-data-grid/sorting/
                                sortModel: [{ field: 'DATE_TOURNEE', sort: 'desc' }],
                            },
                        }}
                        onRowSelectionModelChange={(x) => setSelectedRowToTransportId(x[0])}
                        rowSelectionModel={selectedRowToTransportId ? [selectedRowToTransportId] : []}
                        disableColumnMenu
                        hideFooter
                        sx={{ backgroundColor: 'white'}}
                    />
                </Grid>
                <TransportFormControl
                    selectedRowAvailable={selectedRowAvailable}
                    selectedRowToTransport={selectedRowToTransport}
                    setSelectedRowAvailableId={setSelectedRowAvailableId}
                    setSelectedRowToTransportId={setSelectedRowToTransportId}
                />
                <Grid item xs style={{minWidth: '480px', maxHeight: '320px', flex: 1}}>
                    <CustomDataGrid
                        rows={availableAnnonceList}
                        getRowId={(row) => row._id}
                        columns={columns}
                        columnVisibilityModel={{DATE_TOURNEE: false}}
                        initialState={{ // got to be on DATE_TOURNEE but it has not a column
                            sorting: { // add num .. https://mui.com/x/react-data-grid/sorting/
                                sortModel: [{ field: 'DATE_TOURNEE', sort: 'desc' }],
                            },
                        }}
                        onRowSelectionModelChange={(x) => setSelectedRowAvailableId(x[0])}
                        rowSelectionModel={selectedRowAvailableId ? [selectedRowAvailableId] : []}
                        disableColumnMenu
                        hideFooter
                        sx={{ backgroundColor: 'white' }}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default AnnonceSelection