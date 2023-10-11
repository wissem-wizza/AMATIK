import { useSelector } from "react-redux";
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Grid,
    Button,
    Dialog,
    LinearProgress,
} from "@mui/material"

import { useDeleteTransportMutation } from "../../features/transport/extendedTransportApi";
import {
    useGetIdentificationsByRelatedTransportQuery,
    useUpdateManyIdentificationsMutation,
    createSelectorsOfIdentificationsByTransport,
} from "../../features/identification/extendedIdentificationApi";
import decline from "../Annonce/decline.png";
import { Fragment } from "react";

const IconImage = ({ image, alt }) => (
    <img
        src={image}
        alt={alt}
        style={{ width: '24px', height: '24px' }}
    />
)

const TransportDelete = ({ open, setOpen, numOrdre, id }) => {

    const [deleteTransport] = useDeleteTransportMutation()
    // following query will be called after deletion and will throw error (need RRD action)
    const { isLoading } = useGetIdentificationsByRelatedTransportQuery(id)
    const [updateIdentifications] = useUpdateManyIdentificationsMutation()

    const relatedIdentifications = useSelector(createSelectorsOfIdentificationsByTransport(id).selectAll)

    const handleTransportCancellation = async () => {
        try {
            await deleteTransport(id);

            await updateIdentifications({
                ids: relatedIdentifications.map(identification => identification._id),
                modification: { dispoTransp: true, TRANSPORT: 0 },
            })
            
            setOpen(false)
        } catch (error) {
            console.log("error", error) // display orange etiquette
        }
    }


    return (
        <Dialog disableEscapeKeyDown open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
            {
                isLoading ?
                <LinearProgress color="success" /> :
                <Fragment>
                    <DialogTitle textAlign="center" marginBottom="10px">Annulation du Transport</DialogTitle>
                    <DialogContent>
                        <Typography textAlign="center" marginBottom="30px">
                            {`Êtes-vous sûr(e) de vouloir annuler le transport numero ${numOrdre}?
                            Si vous confirmez cette action, le transport sera définitivement supprimé.`}
                        </Typography>
                        <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            wrap="nowrap"
                            gap={2}
                        >
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    startIcon={<IconImage image={decline} alt="decline" />}
                                    onClick={() => handleTransportCancellation()}
                                >
                                    Retirer le transport
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ color: "gray" }} onClick={() => setOpen(false)}>Annuler</Button>
                    </DialogActions>
                </Fragment>
            }
        </Dialog>
    )
}

export default TransportDelete