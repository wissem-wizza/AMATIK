import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form'
import {
    Grid,
    Autocomplete,
    TextField,
    Select,
    MenuItem,
    CircularProgress,
    Paper
} from '@mui/material'
import { styled } from '@mui/material/styles';

import { useGetEleveursQuery, selectAllEleveursExcerpt } from "../../features/eleveur/extendedEleveurApi";
import { useSignupMutation } from "../../features/auth/authApiSlice";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    padding: "20px",
}));

const formFields = ["type", "nom", "email", "clé", "password"]
const [type, nom, email, clé, password] = formFields

const typeList = [
    { id: 0, value: 'Superviseur' },
    { id: 1, value: 'Eleveur' }
]

const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@/ +
    /((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



const CreateForm = () => {

    const navigate = useNavigate()

    const { isLoading } = useGetEleveursQuery("NOM,CLE,email")
    const [createUser, result] = useSignupMutation();
    const selectedEleveurData = useSelector(selectAllEleveursExcerpt)
    const [eleveurData, setEleveurData] = useState([])

    useEffect(() => {

        if (!isLoading && eleveurData.length === 0) {
            const filteredEleveurData = selectedEleveurData.filter((eleveur, index, arr) => {
                const trimmedEmail = eleveur.email?.trim();
                // findIndex return first accurence of the element, hence we would know any duplication
                return (trimmedEmail && arr.findIndex(item => item.email?.trim() === trimmedEmail) === index)
            })
            console.log("total", filteredEleveurData.length)

            setEleveurData([
                { email: "", CLE: 0, NOM: "" },
                ...filteredEleveurData]
            )
        }
    }, [eleveurData.length, isLoading, selectedEleveurData])

    const { control, watch, setValue, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: "onBlur",
        defaultValues: {
            [type]: typeList[1].value,
            [clé]: 0,
        }
    })

    const onSubmit = async data => {
        const { type, email, nom, password } = data

        if (!type || !email || !nom || !password) {
            // need better form validation and with efficient approach
            console.log("wrong value");
            return;
        }

        try {
            await createUser({ email, nom: nom, password, type }).unwrap();
            // const { isCreationLoading, isSuccess, isError, originalArgs } = result
            // console.log("new user", isCreationLoading, isSuccess, isError, originalArgs)
            console.log("new user", result)
            navigate(0)
        } catch (error) {
            console.log("err", error)
        }
    };

    console.log("errors", errors)

    return (
        <Item variant="outlined" sx={{minWidth: "100%", minHeight: "100%"}}>
            <form id="profile-creation-form" onSubmit={handleSubmit(onSubmit)}>
                <Grid
                    container
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={2}
                >

                    <Grid item>
                        <Controller
                            control={control}
                            name={type}
                            defaultValue={typeList[1].value}
                            render={({ field: { value, onChange, ...field } }) => (
                                <Select
                                    value={value}
                                    onChange={(e) => {
                                        setValue(nom, "")
                                        setValue(email, "")
                                        if (value === "Superviseur") { // will be Eleveur
                                            setValue(password, watch(clé))
                                        } else {
                                            setValue(password, "")
                                        }
                                        onChange(e)
                                    }}
                                    fullWidth
                                    {...field}
                                    disabled
                                >
                                    {typeList.map((item) => (
                                        <MenuItem key={item.id} value={item.value}>
                                            {item.value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                    </Grid>

                    <Grid item sx={{minWidth: "80%"}}>
                        {
                            eleveurData.length !== 0 ?
                                <Controller
                                    control={control}
                                    name={email}
                                    defaultValue={eleveurData[0].email}
                                    rules={{required: true, pattern: emailPattern}}
                                    render={({ field: { ref, value, onChange, ...field } }) => {
                                        if (watch(type) === 'Superviseur') {
                                            return (
                                                <TextField
                                                    {...field}
                                                    value={value}
                                                    onChange={onChange}
                                                    label="Email"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            )
                                        } else
                                            return (
                                                <Autocomplete
                                                    options={eleveurData.map(eleveur => eleveur.email)}
                                                    getOptionLabel={(option) => option ? option : ""}
                                                    value={value}
                                                    onChange={(_, data) => {
                                                        onChange(data);
                                                        if (watch(type) === "Eleveur") {
                                                            let eleveur = eleveurData.find(eleveur => eleveur.email === watch(email))
                                                            setValue(nom, eleveur?.NOM || "")
                                                            setValue(password, eleveur?.CLE || "")
                                                        }
                                                    }}
                                                    sx={{ minWidth: "80%" }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...field}
                                                            {...params}
                                                            size='medium'
                                                            inputRef={ref}
                                                            label="Adresse mail"
                                                            autoComplete="off"
                                                            fullWidth
                                                        />
                                                    )}
                                                />
                                            )
                                    }}
                                />
                                : <CircularProgress />
                        }
                    </Grid>

                    {
                        watch(type) === "Eleveur" &&
                        <Grid item sx={{minWidth: "80%"}}>
                            <TextField
                                size="medium"
                                label={clé}
                                value={eleveurData.find(eleveur => eleveur.email === watch(email))?.CLE || 0}
                                variant="filled"
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                    }

                    <Grid item sx={{minWidth: "80%"}}>
                        <Controller
                            control={control}
                            name={nom}
                            defaultValue=""
                            rules={{}}
                            render={({ field: { value, onChange, ...field } }) => (
                                <TextField
                                    {...field}
                                    size="medium"
                                    label="Nom complet"
                                    value={watch(nom) ? watch(nom) : ""}
                                    onChange={(e) => {
                                        setValue(nom,
                                            e.target.value
                                        )
                                    }}
                                    // error={errors}
                                    // helperText="Incorrect entry."
                                    variant={watch(type) === "Eleveur" ? "filled" : "outlined"}
                                    InputProps={{
                                        readOnly: (watch(type) === "Eleveur"),
                                    }}
                                    autoComplete="off"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>

                    {
                        (watch(type) === "Superviseur") &&
                        <Grid item sx={{ minWidth: "80%" }}>
                            <Controller
                                control={control}
                                name={password}
                                defaultValue=""
                                render={({ field: { value, onChange, ...field } }) => (
                                    <TextField
                                        {...field}
                                        size="medium"
                                        label="Mot de passe"
                                        value={value}
                                        onChange={onChange}
                                        variant="outlined"
                                        type="password"
                                        autoComplete="off"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                    }

                </Grid>
            </form>
        </Item>
    )
}

export default CreateForm