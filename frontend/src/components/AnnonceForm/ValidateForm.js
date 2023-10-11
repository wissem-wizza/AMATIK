import {
    Grid,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { useCustomFormContext } from './AnnonceForm'

const ValidateForm = ({ openDialog, setOpenDialog, handleReset, onSubmit }) => {

    const handleCloseDialog = (_, reason) => {
        if (reason !== 'backdropClick') {
            setOpenDialog(false);
            handleReset()
        }
    };

    const { handleSubmit, getValues } = useFormContext()
    const { ID, nouvelle } = useCustomFormContext()

    return (
        <Dialog disableEscapeKeyDown open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
            <DialogTitle textAlign="center" marginBottom="10px">
                Confirmation de la nouvelle annonce
            </DialogTitle>
            <DialogContent>
            <List>
                <Typography textAlign="center" marginBottom="30px">
                {
                    `L'annonce numéro ${ID} est prête à être ${nouvelle ? 'ajoutée' : 'modifiée'}.
                    Merci de confirmer votre choix.`
                }
                </Typography>
                {Object.entries(getValues()).map((item, index) => (
                    // (item[0] === "ID"
                    // || /[012]/.test(item[0]) (getValues("espece") !== "Caprin" && ["Chèvres", "Boucs"].includes(item[0]))
                    // ) ? null :
                    <ListItem key={index} style={{display:'flex', justifyContent:'center'}}>
                        <Typography variant="body1" style={{ fontWeight: 'bold', marginRight: 10 }}>
                            {item[0]}:
                        </Typography>
                        <Typography variant="body1">{item[0] === "date" ? item[1].format('YYYY-MM-DD') : item[1]}</Typography>
                    </ListItem>
                ))}
            </List>
            </DialogContent>
            <DialogActions>
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
                            color="warning"
                            onClick={handleReset}
                        >
                            Revoir
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            color="success"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Confirmer
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default ValidateForm