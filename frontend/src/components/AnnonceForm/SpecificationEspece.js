import {
    TextField,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import { formFields, ovinsCategories, ovinsWeights, caprinsCategories } from './formData';
import { useCustomFormContext } from './AnnonceForm';

const Specification = () => {

    const espece = formFields[0]
    const total = formFields[4]
    const [Chèvres, Boucs] = caprinsCategories

    const {
        control,
        setValue,
        watch,
    } = useFormContext();

    const { injectedFormInputs } = useCustomFormContext()

    const handleCaprinsInputChange = (e, category) => {
        const numericInput = (parseInt(e.target.value) || 0)
        const newValue =  numericInput < 999 ? numericInput > 0 ? numericInput : 0 : 999;
        let currentTotal = 0; // ";" is a must
        [Chèvres, Boucs].forEach(currentCategory => {
            if (currentCategory !== category) {
                currentTotal += watch(currentCategory)
            } else {
                currentTotal += newValue
            }
        })
        setValue(total, parseInt(currentTotal) || 0)
        setValue(category, newValue);
    }

    const handleOvinsInputChange = (e, category, weightIndex) => {
        const numericInput = (parseInt(e.target.value) || 0)
        const newValue =  numericInput < 999 ? numericInput > 0 ? numericInput : 0 : 999;
        let currentTotal = 0
        ovinsCategories.forEach(currentCategory => {
            ovinsWeights.forEach((_, currentWeightIndex) => {
                let field = `${currentCategory}${currentWeightIndex}`
                if (field !== `${category}${weightIndex}`) { // could be written in 1 line
                    currentTotal += watch(field)
                } else {
                    currentTotal += newValue
                }
            })
        })
        setValue(total, parseInt(currentTotal) || 0)
        setValue(`${category}${weightIndex}`, newValue);
    }

    const shouldDisplayTable = true
    return (
        <Grid item>
            {
                watch(espece) === "Ovins" ?
                <Grid container gap={2}>
                {/* Reserved space for the table */}
                <Grid item xs={12} flex="1 1 auto">
                    {shouldDisplayTable ? (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Catégorie de Poids</TableCell>
                                        <TableCell>Agneaux</TableCell>
                                        <TableCell>Béliers</TableCell>
                                        <TableCell>Brebis</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                {ovinsWeights.map((weight, weightIndex) => (
                                    <TableRow key={weightIndex}>
                                        <TableCell>{weight}</TableCell>
                                        {ovinsCategories.map((category) => (
                                            <TableCell key={`${category}${weightIndex}`}>
                                                <Controller
                                                    name={`${category}${weightIndex}`}
                                                    control={control}
                                                    defaultValue={injectedFormInputs[`${category}${weightIndex}`]}
                                                    render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        sx={{ maxWidth: "80px" }}
                                                        variant="outlined"
                                                        type="number"
                                                        size='small'
                                                        inputProps={{ min: 0, max: 999 }}
                                                        onChange={(e) => handleOvinsInputChange(e, category, weightIndex)}
                                                    />
                                                    )}
                                                />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}

                                    <TableRow>
                                        <TableCell>Somme</TableCell>
                                        <TableCell style={{marginInlineStart: "10px"}}>
                                            {
                                                (
                                                    parseInt(watch("agneaux0")) ||
                                                    injectedFormInputs["agneaux0"]
                                                ) +
                                                (
                                                    parseInt(watch("agneaux1")) ||
                                                    injectedFormInputs["agneaux1"]
                                                ) +
                                                (
                                                    parseInt(watch("agneaux2")) ||
                                                    injectedFormInputs["agneaux2"]
                                                )
                                            }
                                        </TableCell>
                                        <TableCell style={{marginInlineStart: "10px"}}>
                                            {
                                                (
                                                    parseInt(watch("beliers0")) ||
                                                    injectedFormInputs["beliers0"]
                                                ) +
                                                (
                                                    parseInt(watch("beliers1")) ||
                                                    injectedFormInputs["beliers1"]
                                                ) +
                                                (
                                                    parseInt(watch("beliers2")) ||
                                                    injectedFormInputs["beliers2"]
                                                )
                                            }
                                        </TableCell>
                                        <TableCell style={{marginInlineStart: "10px"}}>
                                            {
                                                (
                                                    parseInt(watch("brebis0")) ||
                                                    injectedFormInputs["brebis0"]
                                                ) +
                                                (
                                                    parseInt(watch("brebis1")) ||
                                                    injectedFormInputs["brebis1"]
                                                ) +
                                                (
                                                    parseInt(watch("brebis2")) ||
                                                    injectedFormInputs["brebis2"]
                                                )
                                            }
                                        </TableCell>
                                    </TableRow>

                                    {/* Repeat similar rows for other categories */}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : null}
                </Grid>

                {/* THEN Buttons always displayed at the same position */}

            </Grid>
            : watch(espece) === "Caprins" ?
            <Grid container item xs={12} sm={6} gap={2} wrap='nowrap' direction="row">
                <Grid item>
                    <Controller
                        name={Chèvres}
                        control={control}
                        defaultValue={injectedFormInputs['Chèvres']}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label={Chèvres}
                                sx={{ minWidth: "160px", backgroundColor: "white" }}
                                variant="outlined"
                                type="number"
                                inputProps={{ min: 0, max: 999 }}
                                onChange={(e) => handleCaprinsInputChange(e, Chèvres)}
                            />
                        )}
                    />
                </Grid>
                <Grid item>
                    <Controller
                        name={Boucs}
                        control={control}
                        defaultValue={injectedFormInputs["Boucs"]}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label={Boucs}
                                sx={{ minWidth: "160px", backgroundColor: "white" }}
                                variant="outlined"
                                type="number"
                                inputProps={{ min: 0, max: 999 }}
                                onChange={(e) => handleCaprinsInputChange(e, Boucs)}
                            />
                        )}
                    />
                </Grid>
            </Grid>
            : null
            }
        </Grid>
    )
}

export default Specification;