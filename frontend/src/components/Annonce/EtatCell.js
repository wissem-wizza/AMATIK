import { useState, Fragment } from 'react';
import {
    Button,
    Dialog,
    Grid,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import { AccessTime } from "@mui/icons-material";

import { useUpdateAnnonceMutation } from "../../features/annonce/extendedAnnonceApi";
import { useCreateIdentificationMutation } from "../../features/identification/extendedIdentificationApi";
import checkmark from "./checkmark.png";
import decline from "./decline.png";

const IconImage = ({ image, alt }) => (
    <img
        src={image}
        alt={alt}
        style={{ width: '24px', height: '24px' }}
    />
)


const EtatCell = ({ value, valueOptions, numAnnonce, ID, type: userType, MOYEN }) => {

    const [updateAnnonce] = useUpdateAnnonceMutation();
    const [createIdentification] = useCreateIdentificationMutation();
    const [open, setOpen] = useState(false);

    const handleClose = (_, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    const handleUpdateEtatAnnonce = async (value) => {
        try {
            const updatedAnnonce = await updateAnnonce({ id: ID, EtatAnnonce: value }).unwrap();
            if (value === valueOptions[1]) {
                const {
                    NUM_ENREGIST,
                    DATE,
                    SEMAINE,
                    RACE,
                    CLE,
                    NOM,
                    eleveur_id,
                    GROUPE: { TOTAL } = {}
                } = updatedAnnonce
                await createIdentification({
                    "NumAnnonce": NUM_ENREGIST,
                    "DATE_TOURNEE": DATE,
                    "SEMAINE": SEMAINE,
                    "SERVICE": RACE,
                    "CODE_ELEVEUR": CLE,
                    "NAISSEUR": NOM,
                    "eleveur_id": eleveur_id,
                    "NB_MOUT": TOTAL,
                    "dispoTransp": MOYEN === "A Prendre",
                    "TRANSPORT": 0, // default value for the expected tranport record
                }).unwrap();
            }
            setOpen(false);
        } catch (error) {
            console.log("err", error)
        }
    };

    return (
        <Fragment>
            {
                value === "validé" ?
                    <IconImage image={checkmark} alt="check mark" />
                : value === "Rejeté" ?
                    <IconImage image={decline} alt="decline" />
                : userType === "Superviseur" ?
                    <Button
                        component="button"
                        variant="outlined"
                        size="small"
                        color='success'
                        style={{ marginLeft: 16, color: "GrayText", fontSize: "0.8rem" }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpen(true)
                        }}
                    >
                        En cours...
                    </Button>
                : <AccessTime/>
            }
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle textAlign="center" marginBottom="10px">Confirmation de l'Annonce</DialogTitle>
                <DialogContent>
                    <Typography textAlign="center" marginBottom="30px">
                        {`L'annonce numéro ${numAnnonce} est prête à être validée ou rejetée. Merci de confirmer votre choix`}
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
                                color="success"
                                startIcon={<IconImage image={checkmark} alt="check mark" />}
                                onClick={() => handleUpdateEtatAnnonce(valueOptions[1])}
                            >
                                Valider
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<IconImage image={decline} alt="decline" />}
                                onClick={() => handleUpdateEtatAnnonce(valueOptions[0])}
                            >
                                Rejeter
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: "gray" }} onClick={handleClose}>Annuler</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default EtatCell;