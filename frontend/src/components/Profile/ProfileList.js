import { useState, Fragment } from 'react';
import {
    Button,
    Dialog,
    Grid,
    Stack,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';

import { useGetUsersQuery, selectAllUsers } from "../../features/user/extendedUserApi";
import CreateForm from './CreateProfileForm';
import withFilter from "../../hooks/withFilter";


const ProfileDialog = ({ open, setOpen }) => {

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    return (
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle textAlign="center" marginBottom="10px">Création d'un nouveau profil</DialogTitle>
            <DialogContent>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    wrap="nowrap"
                    gap={2}
                >
                    <CreateForm />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Stack direction="row" justifyContent="flex-end" alignItems="center">
                    <Button sx={{ color: "gray" }} onClick={handleClose}>Annuler</Button>
                    <Button color='success' variant='contained' form="profile-creation-form" type="submit">Créer</Button>
                </Stack>
            </DialogActions>
        </Dialog>
    )
}


const columns = [
    { field: 'TYPE', headerName: 'Type de Profil', width: 150, type: 'singleSelect',
        valueOptions: ['Superviseur', 'Éleveur']
    },
    { field: 'NOM', headerName: 'Nom', type: 'string', width: 150 },
    { field: 'EMAIL', headerName: 'Adresse Email', type: 'string', width: 250 },
];

const UserList = () => {

    const [open, setOpen] = useState(false);

    const FilteredProfileList = withFilter({
        mainQueryHook: useGetUsersQuery,
        dataSelection: selectAllUsers,
        columns,
        route: 'user',
        customPaginationStyling: {minWidth: 'auto'},
        dialogForm: true,
        openFormDialog: () => setOpen(true),
    });

    return (
        <Fragment>
            {
                open ? <ProfileDialog open={open} setOpen={setOpen} /> : null
            }
            <FilteredProfileList />
        </Fragment>
    )
}

export default UserList