import { useLoaderData, useNavigate } from 'react-router-dom';
import {
    Autocomplete,
    Chip,
    Divider,
    Grid,
    TextField,
    Paper,
    Stack,
    Typography,
    Button,
} from '@mui/material';
import { useForm, Controller } from "react-hook-form";

import {
    useCreateEleveurMutation,
    useUpdateEleveurMutation
} from '../../features/eleveur/extendedEleveurApi'; 
import { formFields, labelEleveur, mapToDatabaseObject } from './formData';
// import data from './eleveurData';
// import labels from './labelData';

const [
    civilité,
    nom,
    clé,
    email,
    adr_fact,
    adr_liv,
    siret,
    TVA,
    label,
    CBANK,
    GUICH,
    COMPTE,
    RIB,
] = formFields;


const EleveurForm = () => {

    const LoaderData = useLoaderData();
    const {
        nouveau,
        labels,
        creationData = {},
        updatingData = {},
    } = LoaderData

    const [ createEleveur ] = useCreateEleveurMutation();
    const [ updateEleveur ] = useUpdateEleveurMutation();
    const navigate = useNavigate()

    const { toUpdate = {} } = updatingData
    const { nouveauClé, numCheptel } = creationData

    const defaultValues = { // editer || ajouter --> filled fields || empty fields
        [nom]: toUpdate.NOM || '',
        [clé]: toUpdate.CLE || nouveauClé, // auto generated
        [email]: toUpdate.email || '',
        [siret]: toUpdate.SIRET || 0,
        [TVA]: toUpdate.TVA_intra || '',
        [CBANK]: toUpdate.CBANK || 0,
        [GUICH]: toUpdate.GUICH || 0,
        [COMPTE]: toUpdate.COMPTE || 0,
        [RIB]: toUpdate.RIB || 0,
        [civilité]: labels.find(label => label.code === toUpdate.TETE)?.code || labels[0].code,
        [label]: labelEleveur.find(label => label.ABR === toUpdate.label)?.ABR || labelEleveur[0].ABR,
    }

    if(!nouveau) {
        toUpdate.ADRESSES.forEach((adresse, i) => defaultValues[adr_fact[i]] = adresse)
        toUpdate.ADRESSES_LIVRAISON.forEach((adresse, i) => defaultValues[adr_liv[i]] = adresse)
    }

    const {
        control,
        register,
        handleSubmit,
        // getValues,
    } = useForm({
        reValidateMode: "onBlur",
        defaultValues,
    });

    const onSubmit = async data => {
        const formInputs = mapToDatabaseObject({...data, numCheptel: numCheptel })
        console.log("data", formInputs)
        try {
            if(nouveau) {
                await createEleveur(formInputs).unwrap();
            } else {
                const { CLE: _cle, CHEPTEL: _cheptel, ...updatableFiels } = formInputs
                await updateEleveur({
                    id: toUpdate._id,
                    ...updatableFiels
                }).unwrap();
            }
            navigate("/eleveur")
        } catch (error) {
            console.log("err", error)
        }
    }


    return (
        <Stack justifyContent="center" alignItems="center">
            <Paper sx={{ margin: "20px", padding: "50px", maxWidth: "max(80vw, 480px)" }} elevation={3}>

                <Grid
                    container
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="center"
                    gap={2}
                    width="max(70vw, 450px)"
                >

                    <Typography variant="h5" textAlign="center" mb={5}>
                        {nouveau ? "Enregistrement d'un Nouvel Éleveur" :
                        `Modification des données de ${toUpdate.NOM}`}
                    </Typography>
                    <Grid
                        item
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >

                        <Grid item container justifyContent="center" alignItems="center" spacing={2}>
                            <Grid item xs={12} sm={6} md={3}>
                                <Controller
                                    control={control}
                                    name={civilité}
                                    render={({ field: { ref, value, onChange, ...field } }) => (
                                        <Autocomplete
                                            options={labels.map(label => label.code)}
                                            getOptionLabel={(option) => {
                                                return labels.find(label => label.code === option).libelle
                                            }}
                                            value={value}
                                            onChange={(_, data) => {
                                                onChange(data);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...field}
                                                    {...params}
                                                    size='small'
                                                    inputRef={ref}
                                                    label="Civilité"
                                                    fullWidth
                                                />
                                            )}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={5}>
                                <TextField
                                    {...register(nom)}
                                    size="small"
                                    label="Nom"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <Grid item container justifyContent="center" alignItems="center" spacing={2}>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField
                                    {...register(clé)}
                                    size="small"
                                    label="Clé"
                                    variant="filled"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={5}>
                                <TextField
                                    {...register(email)}
                                    size="small"
                                    label="Email"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                    </Grid>

                    <Divider
                        // textAlign="left"
                        sx={{ width: '100%', marginBlock: '20px' }}
                    >
                        <Chip label="Adresses" />
                    </Divider>

                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                        gap={2}
                        wrap="nowrap"
                    >
                        {/* Adresse de facturation */}
                        <Grid item>
                            <Typography textAlign="center" mb={2}>Adresse de facturation</Typography>
                            <Stack
                                sx={{
                                    width: '25ch',
                                }}
                                noValidate
                                direction="column"
                                autoComplete="off"
                            >
                                {adr_fact.map((_, i) => (
                                    <TextField
                                        {...register(adr_fact[i])}
                                        size='small'
                                        hiddenLabel
                                        key={i}
                                    />
                                ))}
                            </Stack>
                        </Grid>

                        {/* Adresse de livraison */}
                        <Grid item>
                            <Typography textAlign="center" mb={2}>Adresse de livraison</Typography>
                            <Stack
                                sx={{
                                    width: '25ch',
                                }}
                                noValidate
                                direction="column"
                                autoComplete="off"
                            >
                                {adr_liv.map((_, i) => (
                                    <TextField
                                        {...register(adr_liv[i])}
                                        size='small'
                                        hiddenLabel
                                        key={i}
                                    />
                                ))}
                            </Stack>
                        </Grid>
                    </Grid>

                    <Divider sx={{ width: '100%', marginBlock: '20px' }}>
                        <Chip label="Identifiants" />
                    </Divider>

                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        gap={2}
                    >

                        <Grid item>
                            <TextField
                                {...register(siret)}
                                size="small"
                                label="Siret"
                                type="number"
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                {...register(TVA)}
                                size="small"
                                label="TVA"
                            />
                        </Grid>

                        <Grid item>
                            <Controller
                                control={control}
                                name={label}
                                render={({ field: { ref, value, onChange, ...field } }) => (
                                    <Autocomplete
                                        options={labelEleveur.map(label => label.ABR)}
                                        getOptionLabel={(option) => {
                                            return labelEleveur.find(label => {
                                                return label.ABR === option
                                            }).DESIGNATION
                                        }}
                                        value={value}
                                        onChange={(_, data) => {
                                            onChange(data);
                                        }}
                                        sx={{ width: 220 }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...field}
                                                {...params}
                                                size="small"
                                                inputRef={ref}
                                                label="Label de l'eleveur"
                                            />
                                        )}
                                    />
                                )}
                            />
                        </Grid>

                    </Grid>

                    <Divider sx={{ width: '100%', marginTop: '50px', marginBottom: '20px' }}>
                        <Chip label="Informations financières" />
                    </Divider>

                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        gap={2}
                    >

                        <Grid item>
                            <TextField
                                {...register(CBANK)}
                                size="small"
                                label="Banque"
                                type="number"
                                sx={{ width: 100 }}
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                {...register(GUICH)}
                                size="small"
                                label="Agence"
                                type="number"
                                sx={{ width: 100 }}
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                {...register(COMPTE)}
                                size="small"
                                label="Compte"
                                type="number"
                                sx={{ width: 150 }}
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                {...register(RIB)}
                                size="small"
                                label="Clé"
                                type="number"
                                sx={{ width: 70 }}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        container
                        alignSelf="stretch"
                        justifyContent="end"
                        alignItems="center"
                        wrap="nowrap"
                        gap={2}
                        marginTop={5}
                    >
                        <Grid item>
                            <Button
                                variant="outlined"
                                sx={{color: "gray", borderColor:"gray"}}
                            >
                                Annuler
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="success"
                                sx={{marginInlineEnd: 15}}
                                onClick={handleSubmit(onSubmit)}
                            >
                                Soumettre
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>
            </Paper>
        </Stack>
    )
}

export default EleveurForm