import {
    TextField,
    MenuItem,
    Select,
    Grid,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form'

import { formFields, especeList, ovinsCategories, ovinsWeights, caprinsCategories } from './formData';
import Specification from './SpecificationEspece';


const AnnonceSecondForm = () => {

    const espece = formFields[0];
    const total = formFields[4];

    const {
        control,
        watch,
        setValue,
    } = useFormContext();

    return (
        <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="flex-start"
            gap={3}
        >
            <Grid item sx={{width: "50%"}}>
                <Controller
                    control={control}
                    name={espece}
                    defaultValue={especeList[0].value}
                    render={({ field: { value, onChange, ...field } }) => (
                        <Select
                            value={value}
                            onChange={(e) => {
                                ovinsCategories.forEach(currentCategory => {
                                    ovinsWeights.forEach((_, currentWeightIndex) => {
                                        setValue(`${currentCategory}${currentWeightIndex}`, 0);
                                    })
                                })
                                caprinsCategories.forEach(caprin => {
                                    setValue(caprin, 0)
                                })
                                setValue(total, 0)
                                onChange(e)
                            }}
                            fullWidth
                            {...field}
                        >
                            {especeList.map((item) => (
                                <MenuItem key={item.id} value={item.value}>
                                    {item.value}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
            </Grid>
            <Specification />
            <Grid item>
                <Controller
                    control={control}
                    name={total}
                    defaultValue={0}
                    render={({ field: { ref, value, onChange, ...field } }) => {
                        if (watch(espece) === "Ovins" || watch(espece) === "Caprins") {
                            return (
                                <TextField
                                    {...field}
                                    value={watch(total)}
                                    label="Total"
                                    variant="filled"
                                    type="number"
                                    disabled
                                />
                            )
                        } else return (
                            <TextField
                                {...field}
                                inputRef={ref}
                                label="Total"
                                variant="outlined"
                                type="number"
                                onChange={onChange}
                                value={value}
                                inputProps={{ min: 0 }}
                                sx={{backgroundColor: "white"}}
                            />
                        )
                    }}
                />
            </Grid>
        </Grid>
    )
}

export default AnnonceSecondForm