import { useState, useContext, forwardRef } from 'react';
import { Grid, Stack, Snackbar, Fade, Button } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { blue, green, red } from '@mui/material/colors';
// import { CustomButton } from '../Foundation/CustomButton'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CustomFormContext } from './TransportForm';

const theme = createTheme({
    palette: {
        blue: {
            main: blue[500],
            light: blue[600],
            dark: blue[700],
            contrastText: 'white',
        },
        green: {
            main: green[500],
            light: green[600],
            dark: green[700],
            contrastText: 'white',
        },
        red: {
            main: red[500],
            light: red[600],
            dark: red[700],
            contrastText: 'white',
        },
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { size: "extraSmall" },
                    style: {
                        margin: 0,
                        fontFamily: "'IBM Plex Sans', sansSerif",
                        fontSize: "0.875rem",
                        lineHeight: "1",
                        whiteSpace: "nowrap",
                        backgroundColor: blue[500],
                        color: "white",
                        borderRadius: "8px",
                        fontWeight: "200",
                        padding: "4px 8px",
                        cursor: "pointer",
                        transition: "all 150ms ease",
                        border: "none",
                        "&:hover": {
                            backgroundColor: blue[600],
                        },
                    
                        "&.active": {
                            backgroundColor: blue[700],
                        },
                    
                        "&.focusVisible": {
                            boxShadow: "0 4px 20px 0 rgb(61 71 82 / 0.1), 0 0 0 5px rgb(0 127 255 / 0.5)",
                            outline: "none",
                        },
                    
                        "&.disabled": {
                            opacity: 0.5,
                            cursor: "notAllowed",
                        },
                    }
                }
            ]
        }
    }
});

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TransportFormControl = ({
    selectedRowAvailable,
    selectedRowToTransport,
    setSelectedRowAvailableId,
    setSelectedRowToTransportId,
}) => {

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const {
        availableAnnonceList,
        toTransportAnnonceList,
        setAvailableAnnonceList,
        setToTransportAnnonceList,
    } = useContext(CustomFormContext);

    return (
        <Grid
            item
            xs={1}
            container
            direction="column"
            justifyContent="space-around"
            alignItems="center"
            spacing={0.5}
            minHeight="312px"
        >
            <Snackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                TransitionComponent={Fade}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="warning">aucune ligne sélectionnée</Alert>
            </Snackbar>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={1}
            >
                <ThemeProvider theme={theme}>
                    <Button variant="outlined" color="success" size="size" sx={{p:0}} onClick={() => {
                        if (selectedRowAvailable) {
                            setAvailableAnnonceList(available => available.filter(annonce => annonce._id !== selectedRowAvailable._id))
                            setToTransportAnnonceList(selected => [...selected, selectedRowAvailable])
                        } else {
                            setSnackbarOpen(true);
                            setTimeout(() => {
                                setSnackbarOpen(false);
                            }, 3000);
                        }
                    }}>{"<<<"}</Button>
                    <Button color="error" variant='outlined' size="size" sx={{p:0}} onClick={() => {
                        if (selectedRowToTransport) {
                            setToTransportAnnonceList(toTransport => toTransport.filter(annonce => annonce._id !== selectedRowToTransport._id))
                            setAvailableAnnonceList(available => [...available, selectedRowToTransport])
                        } else {
                            setSnackbarOpen(true);
                            setTimeout(() => {
                                setSnackbarOpen(false);
                            }, 3000);
                        }
                    }}>{">>>"}</Button>
                </ThemeProvider>
            </Stack>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
            >
                <Button
                    sx={{ fontSize: "0.5em" }}
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => {
                        setToTransportAnnonceList(toTransport => [...toTransport, ...availableAnnonceList])
                        setAvailableAnnonceList([])
                        setSelectedRowAvailableId(null)
                        setSelectedRowToTransportId(null)
                    }}
                >
                    {"<< Tous"}
                </Button>
                <Button
                    sx={{ fontSize: "0.5em" }}
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => {
                        setAvailableAnnonceList(available => [...available, ...toTransportAnnonceList])
                        setToTransportAnnonceList([])
                        setSelectedRowAvailableId(null)
                        setSelectedRowToTransportId(null)
                    }}
                >
                    {"Tous >>"}
                </Button>
            </Stack>
        </Grid>
    )
}

export default TransportFormControl