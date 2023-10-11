import { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLoaderData, useNavigation, useParams } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
    TextField,
    Grid,
    LinearProgress,
} from '@mui/material';
import { useForm, Controller, FormProvider } from "react-hook-form";
import dayjs from 'dayjs';
import weekOfYear  from 'dayjs/plugin/weekOfYear';

import { selectCurrentUser } from '../../features/auth/authSlice';
import { useCreateAnnonceMutation, useUpdateAnnonceMutation } from "../../features/annonce/extendedAnnonceApi";
import FormSteps from './VerticalStepper';
import { especeList, formFields, type_annonce, mapToDatabaseObject, mapToFormInputs } from './formData';

dayjs.extend(weekOfYear)

const CustomFormContext = createContext();
export const useCustomFormContext = () => useContext(CustomFormContext);


const AnnonceForm = () => {

    const navigate = useNavigate()
    const loaderData = useLoaderData();
    const { state } = useNavigation(); // not optimal solution !!
    const { id: annonce_id } = useParams();

    const user = useSelector(selectCurrentUser);
    const [createAnnonce
        // , result // result could be used to update the cache if it's not already done in the slice
    ] = useCreateAnnonceMutation();
    const [ updateAnnonce ] = useUpdateAnnonceMutation();

    const {
        nouvelle,
        data
    } = loaderData;

    const injectedFormInputs = mapToFormInputs(data, dayjs);

    // if it's a filled form to modify an "annonce"
    const {
        date: defaultDate,
        semaine: defaultSemaine,
        espece: defaultEspece,
        type: defaultType,
        total: defaultTotal,
        ID: defaultID
    } = injectedFormInputs
    // if it's an empty form for "annonce" creation
    const ID = data.newID ?? defaultID

    const [espece, date, semaine, type, total] = formFields

    const methods = useForm({
        reValidateMode: "onBlur",
        defaultValues: { // editer || ajouter --> filled fields || empty fields
            [date]: dayjs(defaultDate) || dayjs(),
            [semaine]: defaultSemaine || dayjs().week(),
            [espece]: defaultEspece || especeList[0].value,
            [type]: defaultType || type_annonce[0].value,
            [total]: defaultTotal || 0,
        }
    })

    const { register, control } = methods

    const onSubmit = async data => {
        const formInputs = mapToDatabaseObject({
            ...data, eleveur_id: user.eleveur_id, CLE: user.cle, NOM: user.nom, ID,
        })
        try {
            if(nouvelle) {
                await createAnnonce(formInputs).unwrap();
            } else {
                const { NUM_ENREGIST: _, ...updatableFiels } = formInputs
                await updateAnnonce({ id: annonce_id, ...updatableFiels }).unwrap();
            }
            navigate("/annonce")
        } catch (error) {
            console.log("err", error)
        }
    }

    if (state === 'loading') {
        return <LinearProgress color="success" />;
    }

    return (
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
                    <TextField fullWidth
                        label="Numero de l'annonce"
                        // sx={{ m: 1, width: '15ch' }}
                        value={ID}
                        variant="filled"
                        disabled
                    />
                </Grid>

                <Grid item xs={8} md={3}>
                    <TextField fullWidth
                        label="Clé de l'eleveur"
                        // sx={{ m: 1, width: '15ch' }}
                        variant="filled"
                        value={user.cle}
                        disabled
                    />
                </Grid>

                <Grid item xs={8} md={3}>
                    <TextField fullWidth
                        {...register(semaine)}
                        label="Semaine"
                        id="filled-start-adornment"
                        // sx={{ m: 1, width: '15ch' }}
                        variant="filled"
                        disabled
                    />
                </Grid>

                <Grid item xs={8} md={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                            control={control}
                            name={date}
                            render={({
                                field: { ref, onBlur, name, onChange, ...field },
                                fieldState
                            }) => (
                                <DatePicker
                                    {...field}
                                    inputRef={ref}
                                    label="Date de l'annonce"
                                    // onChange={(newDate) => {
                                    //     setValue(semaine, newDate.week());
                                    //     onChange(newDate);
                                    // }}
                                    format="DD-MM-YYYY"
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            variant: "filled",
                                            onBlur,
                                            name,
                                            error: !!fieldState?.error,
                                            helperText: fieldState?.error?.message,
                                            // style: {
                                            //     backgroundColor: 'white', // Set the background color of the input
                                            // },
                                        }
                                    }}
                                    disabled
                                />
                            )}
                        />
                    </LocalizationProvider>
                </Grid>

            </Grid>
            <Grid
                item
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"
            >
                <CustomFormContext.Provider value={{ ID, nouvelle, injectedFormInputs }}>
                    <FormProvider {...methods}>
                        <FormSteps onSubmit={onSubmit} />
                    </FormProvider>
                </CustomFormContext.Provider>
            </Grid>
        </Grid>
    )
}

export default AnnonceForm