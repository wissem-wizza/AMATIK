import { useContext } from 'react'
import { useFormContext, Controller } from "react-hook-form";
import { Autocomplete, Grid, TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider, TimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import dayjs from 'dayjs';


import { formFields } from './formData';
import { CustomFormContext } from './TransportForm';

const eightAM = dayjs().set('hour', 8).startOf('hour');
const threePM = dayjs().set('hour', 15).startOf('hour');


const TransportUpperForm = () => {

    const [date, heure, chauffeur, immatriculation, site] = formFields

    const { control } = useFormContext();
    const {
        ID,
        selectedFields
    } = useContext(CustomFormContext);
    const {
        IMMATRICULATION: immatriculationList,
        CHAUFFEUR: chauffeurList,
        DESIGNATION: siteList,
    } = selectedFields

    return (
        <Grid
            id="parent-grid"
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <Grid
                item
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Grid item xs={12} sm={8} md={3}>
                    <TextField
                        size="small"
                        fullWidth
                        label="N° d'ordre"
                        variant="filled"
                        defaultValue={ID}
                        InputProps={{
                            readOnly: true,
                        }}
                        type="number"
                        disabled
                    />
                </Grid>
                <Grid item xs={12} sm={8} md={3}>
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
                            format="DD-MM-YYYY"
                            label="Date du transport"
                            onChange={onChange}
                            disablePast
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    size: "small",
                                    required: true,
                                    onBlur,
                                    name,
                                    error: !!fieldState?.error,
                                    helperText: fieldState?.error?.message,
                                    style: {
                                        backgroundColor: 'white', // Set the background color of the input
                                    },
                                }
                            }}
                        />
                        )}
                    />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={8} md={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                            control={control}
                            name={heure}
                            render={({
                                field: { ref, onBlur, name, onChange, ...field },
                                fieldState
                            }) => (
                                <TimePicker
                                    {...field}
                                    inputRef={ref}
                                    label="Heure"
                                    onChange={onChange}
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }}
                                    minTime={eightAM}
                                    maxTime={threePM}
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            fullWidth: true,
                                            required: true,
                                            onBlur,
                                            name,
                                            error: !!fieldState?.error,
                                            helperText: fieldState?.error?.message,
                                        },
                                    }}
                                />
                            )}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
            <Grid
                item
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >

                <Grid item xs={12} sm={8} md={3}>
                    <Controller
                        control={control}
                        name={chauffeur}
                        render={({ field: { ref, value, onChange, ...field } }) => (
                            <Autocomplete
                                options={chauffeurList.map(ch => ch.value)}
                                value={value}
                                getOptionLabel={(option) => option}
                                onChange={(_, data) => {
                                    onChange(data);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...field}
                                        {...params}
                                        size='small'
                                        inputRef={ref}
                                        label="Chauffeur"
                                        fullWidth
                                    />
                                )}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} sm={8} md={3}>
                    <Controller
                        control={control}
                        name={immatriculation}
                        render={({ field: { ref, value, onChange, ...field } }) => (
                            <Autocomplete
                                options={immatriculationList.map(imm => imm.value)}
                                value={value}
                                getOptionLabel={(option) => option}
                                onChange={(_, data) => {
                                    onChange(data);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...field}
                                        {...params}
                                        size='small'
                                        inputRef={ref}
                                        label="Immatriculation"
                                        fullWidth
                                    />
                                )}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} sm={8} md={3}>
                    <Controller
                        control={control}
                        name={site}
                        render={({ field: { ref, value, onChange, ...field } }) => (
                            <Autocomplete
                                options={siteList.map(s => s.id)}
                                value={value}
                                getOptionLabel={(option) => siteList.find(s => s.id === option).label}
                                onChange={(_, data) => {
                                    onChange(data);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...field}
                                        {...params}
                                        size='small'
                                        inputRef={ref}
                                        label="Centre"
                                        fullWidth
                                    />
                                )}
                            />
                        )}
                    />
                </Grid>

            </Grid>
        </Grid>
    )
}

export default TransportUpperForm