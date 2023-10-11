import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Grid,
    Button,
    Dialog
} from "@mui/material"

import { useDeleteAnnonceMutation } from "../../features/annonce/extendedAnnonceApi";
import decline from "./decline.png";

const IconImage = ({ image, alt }) => (
    <img
        src={image}
        alt={alt}
        style={{ width: '24px', height: '24px' }}
    />
)

const AnnonceDelete = ({ open, setOpen, numAnnonce, id }) => {

    const [deleteAnnonce] = useDeleteAnnonceMutation()

    const handleAnnonceCancellation = async () => {
        try {
            await deleteAnnonce(id);
            
            setOpen(false)
        } catch (error) {
            console.log("error", error) // display orange etiquette
        }
    }

    return (
        <Dialog disableEscapeKeyDown open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
            <DialogTitle textAlign="center" marginBottom="10px">Annulation de l'Annonce</DialogTitle>
            <DialogContent>
                <Typography textAlign="center" marginBottom="30px">
                    {`Êtes-vous sûr(e) de vouloir annuler l'annonce numero ${numAnnonce}?
                    Si vous confirmez cette action, l'annonce sera définitivement supprimée.`}
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
                            onClick={() => handleAnnonceCancellation()}
                        >
                            Retirer L'annonce
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button sx={{ color: "gray" }} onClick={() => setOpen(false)}>Annuler</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AnnonceDelete