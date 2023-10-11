import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Stack,
    Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import {
    useCreateAnnonceLaineMutation,
    useUpdateAnnonceLaineMutation,
} from "../../features/annonce/AnnonceLaineApi";
import { selectCurrentUser } from '../../features/auth/authSlice';
import { formFields, mapToFormInputs, mapToDatabaseObject } from '../AnnonceLaineForm/formData';

dayjs.extend(weekOfYear)

const [poids, type, date, semaine] = formFields
// open, setOpen, nouvelle, natureList, rowToEdit
const AnnonceLaineForm = ({ formQuery, arg, nouvelle, natureList, open, setOpen,
    rowToEdit, setFormStateChanged, setFormDialogState }) =>
{

    const [data, setData] = useState({
        toUpdate: {},
        newID: null,
    })
    const [readyComponent, setReadyComponent] = useState(false)

    const [formInputs, setFormInputs] = useState({})

    const { data: queryData, isLoading } = formQuery(arg);

    const [createAnnonce] = useCreateAnnonceLaineMutation();
    const [updateAnnonce] = useUpdateAnnonceLaineMutation();

    const user = useSelector(selectCurrentUser);

    const {
        control,
        handleSubmit,
        register,
    } = useForm({
        reValidateMode: "onBlur",
    });

    useEffect(() => {
        if (!isLoading && !readyComponent) {
            if (nouvelle) {
                setData(data => ({ ...data, newID: queryData.valeur }))
            } else {
                const adaptedResponse = Object.values(queryData?.entities)?.[0]
                setData(data => ({ ...data, toUpdate: adaptedResponse }))
                setFormInputs(mapToFormInputs(adaptedResponse, dayjs, natureList))
            }
            setReadyComponent(true)
        }
    }, [isLoading, nouvelle, queryData, data, natureList, readyComponent])

    const onSubmit = async data => {
        const databaseObject = mapToDatabaseObject({
            ...data,
            eleveur_id: user.eleveur_id,
            CLE: user.cle,
            NOM: user.nom,
            ID: formInputs.ID || queryData.valeur,
        }, natureList, dayjs)
        try {
            if (nouvelle) {
                await createAnnonce(databaseObject).unwrap();
            } else {
                const { NUM_ENREGIST: _, ...updatableFiels } = databaseObject
                await updateAnnonce({ id: rowToEdit, ...updatableFiels }).unwrap();
            }
            setOpen(false)
        } catch (error) {
            console.log("err", error)
        }
    }

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    if (isLoading || !readyComponent) {
        return <CircularProgress color="success"
        // sx={{padding: "20px"}}
        />
    }

    return (
        <Dialog
            disableEscapeKeyDown
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle textAlign="center" marginBottom="10px">
                {nouvelle ? "Création d'une nouvelle annonce laine" : "Editer l'annonce"}
            </DialogTitle>
            <DialogContent>
                <form id="annonce-laine-creation-form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        wrap="nowrap"
                        gap={2}
                    >
                        <Grid
                            container
                            direction="column"
                            justifyContent="space-evenly"
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid
                                item
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={1}
                                // wrap='nowrap'
                                sx={{ width: "max(74%, 42rem)" }}
                            >

                                <Grid item xs={8} md={3}>
                                    <TextField
                                        fullWidth
                                        label="Numero de l'annonce"
                                        // sx={{ m: 1, width: '15ch' }}
                                        value={formInputs.ID || queryData.valeur}
                                        variant="filled"
                                        disabled
                                    />
                                </Grid>

                                <Grid item xs={8} md={3}>
                                    <TextField
                                        fullWidth
                                        label="Clé de l'eleveur"
                                        // sx={{ m: 1, width: '15ch' }}
                                        variant="filled"
                                        value={user.cle}
                                        disabled
                                    />
                                </Grid>

                                <Grid item xs={8} md={3}>
                                    <TextField
                                        {...register(semaine)}
                                        fullWidth
                                        label="Semaine"
                                        id="filled-start-adornment"
                                        value={formInputs.semaine || dayjs().week()}
                                        // sx={{ m: 1, width: '15ch' }}
                                        variant="filled"
                                        disabled
                                    />
                                </Grid>

                                <Grid item xs={8} md={3}>
                                    <TextField
                                        {...register(date)}
                                        label="Date de l'annonce"
                                        defaultValue={
                                            formInputs.date ||
                                            dayjs().format("YYYY-MM-DD").toString()
                                        }
                                        fullWidth
                                        variant="filled"
                                        disabled
                                    />
                                </Grid>

                            </Grid>
                            <Grid
                                item
                                container
                                direction="column"
                                justifyContent="space-evenly"
                                alignItems="center"
                            >
                                <Grid
                                    container
                                    justifyContent="space-around"
                                    alignItems="center"
                                    p={3}
                                    sx={{ backgroundColor: "#eee", borderRadius: "20px", width: "max(74%, 42rem)" }}
                                >

                                    <Grid item sm={6}>
                                        <Controller
                                            control={control}
                                            name={type}
                                            defaultValue={formInputs.type || natureList[0].value}
                                            render={({ field: { value, onChange, ...field } }) => (
                                                <FormControl fullWidth>
                                                    <InputLabel id="type-de-laine">Type de laine</InputLabel>
                                                    <Select
                                                        labelId="type-de-laine"
                                                        label="Type de laine" // opacity: 0
                                                        value={value}
                                                        fullWidth
                                                        onChange={(_, data) => onChange(data.props.value)}
                                                        {...field}
                                                    >
                                                        {natureList.map((item) => (
                                                            <MenuItem key={item.id} value={item.value}>
                                                                {item.value}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>

                                    <Grid item>
                                        <Controller
                                            control={control}
                                            name={poids}
                                            defaultValue={formInputs.poids || 0}
                                            render={({ field: { ref, value, onChange, ...field } }) => (
                                                <TextField
                                                    label="Poids du laine"
                                                    value={value}
                                                    fullWidth
                                                    type='number'
                                                    onChange={(e) => onChange(e.target.value)}
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </Grid>

                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Stack direction="row" justifyContent="flex-end" alignItems="center">
                    <Button
                    sx={{ color: "gray" }}
                        onClick={(e) => {
                            setFormStateChanged(false)
                            setFormDialogState(null)
                            handleClose(e)
                    }}
                    >
                        Annuler
                    </Button>
                    <Button color='success' variant='contained' form="annonce-laine-creation-form" type="submit">
                        {nouvelle ? "Créer" : "Soumettre"}
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    )
}

export default AnnonceLaineForm