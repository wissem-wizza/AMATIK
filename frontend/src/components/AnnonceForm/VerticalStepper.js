import { useState } from 'react';
import {
    Box,
    Grid,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Button,
    Typography,
} from '@mui/material';

import FirstFormPage from './AnnonceFirstForm';
import SecondFormPage from './AnnonceSecondForm';
import ValidateForm from './ValidateForm';

const steps = [
    {
        label: 'Expéditeur',
        description: `Informations sur le transport.`,
        Content: () => <FirstFormPage />
    },
    {
        label: 'Charge',
        description:
            `Détails sur le transport, incluant moutons, bétail, chèvres,
            et leurs quantités spécifiques.`,
        Content: () => <SecondFormPage />
    },
]


const VerticalLinearStepper = ({ onSubmit }) => {

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => {
            if (prevActiveStep + 1 === steps.length) {
                setOpenDialog(true)
            }
            return prevActiveStep + 1
        });
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const [openDialog, setOpenDialog] = useState(false);

    return (
        <Grid container p={3} sx={{ backgroundColor: "#eee", borderRadius: "20px", width: "max(74%, 42rem)" }}>
            <Grid item>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => {
                        const { label, description, Content} = step
                        return (
                            <Step key={label}>
                                <StepLabel
                                    sx={{
                                        '& .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active': {
                                            color: '#06603a',
                                        },
                                        '& .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed': {
                                            color: '#06603a',
                                        },
                                    }}
                                >
                                    {label}
                                </StepLabel>
                                <StepContent>
                                    <Grid
                                        container
                                        direction="column"
                                        justifyContent="space-between"
                                        alignItems="stretch"
                                        gap={2}
                                    >
                                        <Grid item>
                                            <Typography p={1}>{description}</Typography>
                                        </Grid>

                                        <Grid item>
                                            <Content/>
                                        </Grid>

                                        <Grid item>
                                            <Box sx={{maxWidth: "90%", marginBlock: "16px"}}>
                                                <div>
                                                    <Button
                                                        variant="contained"
                                                        onClick={handleNext}
                                                        sx={{ mt: 1, mr: 1 }}
                                                        color="success"
                                                    >
                                                        {index === steps.length - 1 ? 'Soumettre' : 'Continuer'}
                                                    </Button>
                                                    <Button
                                                        disabled={index === 0}
                                                        onClick={handleBack}
                                                        color="success"
                                                        sx={{ mt: 1, mr: 1 }}
                                                    >
                                                        Back
                                                    </Button>
                                                </div>
                                            </Box>
                                        </Grid>

                                    </Grid>
                                </StepContent>
                            </Step>
                        )
                    })}
                </Stepper>
            </Grid>
            {activeStep === steps.length && (
                <ValidateForm
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                    handleReset={handleReset}
                    onSubmit={onSubmit}
                />
            )}
        </Grid>
    );
}

export default VerticalLinearStepper