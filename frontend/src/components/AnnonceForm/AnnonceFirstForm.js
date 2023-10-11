import {
    FormControl,
    Grid,
    Stack,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Alert,
    AlertTitle
} from '@mui/material';
import { Controller, useFormContext } from "react-hook-form";

import { formFields, type_annonce } from './formData';

const notes = [
    `Si vous préférez, nos chauffeurs peuvent venir collecter vos moutons directement sur votre ferme.
    Nous planifierons le ramassage selon vos disponibilités`,
    `Si vous souhaitez vous-même transporter les moutons jusqu'à notre site, choisissez cette option.
    Vous serez en charge du chargement et du déplacement`
]


const AnnonceFormFirst = () => {

    const { control, watch } = useFormContext();

    const type = formFields[3];

    return (
        <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            p={2}
            direction="column"
            wrap='nowrap'
            spacing={3}
        >
            <Grid item xs={12} sm={8}>
                <FormControl>
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        direction="row"
                        flexWrap="nowrap"
                        spacing={3}
                        sx={{ marginInlineStart: "50px" }}
                    >
                        <FormLabel color='success' id="demo-radio-buttons-group-label">Moyen de transport</FormLabel>
                        <Controller
                            name={type}
                            control={control}
                            defaultValue={type_annonce[0].value}
                            render={({
                                field: { onChange, value },
                                fieldState: { error }, formState, }) => (
                            <RadioGroup
                                row
                                value={value}
                                onChange={(e, data) => {
                                    onChange(e, data)
                                }}
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="start"
                                    wrap="nowrap"
                                >
                                    {type_annonce.map((type, i) => (
                                        <Grid item key={i}>
                                            <FormControlLabel
                                                value={type.value}
                                                control={<Radio color="success" />}
                                                label={type.label}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </RadioGroup>
                            )}
                        />
                    </Stack>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
            <Alert severity={watch(type) === "A Prendre" ? "info" : "warning"}>
                <AlertTitle>Remarque</AlertTitle>
                {watch(type) === "A Prendre"
                ? notes[0]
                : notes[1]}
            </Alert>
            </Grid>
        </Grid>
    )
}

export default AnnonceFormFirst