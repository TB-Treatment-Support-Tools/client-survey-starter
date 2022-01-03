import { Patient } from "fhir/r4";
import { cloneElement, useState } from "react";
import OptionButton from "../Buttons/OptionButton";
import { Dialog, IconButton, Step, StepLabel, Stepper, Typography } from "@mui/material";
import BaseDetails from "./BaseDetails";
import { Box } from "@mui/system";
import classes from './styles.module.scss'
import Grid from '@mui/material/Grid'
import Conditions from "./Conditions";
import { AddOutlined, ChevronLeft } from "@mui/icons-material";
import AddPatient from "../../types/add-patient";
import CarePlanInfo from "./CarePlanInfo";

const generatePatient = (): Patient => {
    const patient: Patient = {
        resourceType: "Patient",
        name: [{
            use: "official",
            given: ["Kyle", "Joseph"],
            family: "Goodwin",

        }],
        telecom: [{ system: "phone", use: "mobile", value: "123456789" }],
        gender: "male",
        birthDate: "1997-10-20",
        managingOrganization: {
            reference: "Organization/1"
        }
    }
    return patient;
}

const steps = ["Details", "Condition", "CarePlan", "Confirmation"];
const stepContent = [<BaseDetails />, <Conditions />, <CarePlanInfo />]

export default function AddPatientFlow() {

    const [open, setOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [information, setInformation] = useState<Patient | null>(null)

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    }

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1)
        } else {
            setOpen(false);
        }
    }

    const handleClose = () => {
        setOpen(false)
        setActiveStep(0)

    }

    return (<>
            <OptionButton onClick={() => { setOpen(true) }}>
                <AddOutlined />
                <Box width="1em" />
                <Typography variant="body1">Add new patient</Typography>
            </OptionButton>
            <Dialog onClose={handleClose} open={open} >
                <Box className={classes.dialog} padding="2em">
                    <Stepper activeStep={activeStep}>
                        {steps.map((step, index) => {
                            return (<Step key={`stepper-${index}`}>
                                <StepLabel icon={`${index + 1}`}>{step}</StepLabel>
                            </Step>)
                        })}
                    </Stepper>
                    <Box padding="1em 0" minHeight="300px">
                        {cloneElement(stepContent[activeStep], { goToNext: handleNext, information: information, setInformation: setInformation })}
                    </Box>
                </Box>
            </Dialog>
            </>
            )
}