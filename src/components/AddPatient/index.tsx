import { MedicationStatement, Organization, Patient, Practitioner, PractitionerRole, PractitionerRoleNotAvailable } from "fhir/r4";
import { cloneElement, useState } from "react";
import OptionButton from "../Buttons/OptionButton";
import { Button, Dialog, Step, StepLabel, Stepper, Typography } from "@mui/material";
import BaseDetails from "./BaseDetails";
import { Box } from "@mui/system";
import classes from './styles.module.scss'
import Grid from '@mui/material/Grid'
import Conditions from "./Conditions";
import { AddOutlined } from "@mui/icons-material";



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

const medStatement: MedicationStatement = {
    resourceType: "MedicationStatement",
    status: "active",
    subject: { type: "Patient", reference: "Patient/1" },
    medicationCodeableConcept: {}

}

const demoOrganization: Organization = {
    resourceType: "Organization",
    name: "Local Hospital"
}

const demoPractitioner: Practitioner = {
    resourceType: "Practitioner",
    identifier: [{ system: "keycloak", value: "586bdd60-3ff9-4db8-a675-0a807bb40754" }],
    active: true,
    name: [{
        use: "official",
        given: ["Testy"],
        family: "Testson",

    }],
    telecom: [{ system: "email", value: "test@gmail.com" }]
}

const demoRole: PractitionerRole = {
    resourceType: "PractitionerRole",
    active: true,
    organization: {
        reference: "Organization/102"
    }

}

const steps = ["Details", "Condition", "CarePlan", "Confirmation"];
const stepContent = [<BaseDetails />, <Conditions />]

export default function AddPatient() {
    //TODO: Add dynamic organization ID

    const [open, setOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    }

    const handleClose = () => {
        setOpen(false)
        setActiveStep(0)

    }

    return (<div>
        <Grid alignItems="center" container>
            <OptionButton onClick={() => { setOpen(true) }}>
                <AddOutlined />
                <Box width="1em" />
                <Typography variant="body1">Add new patient</Typography>
            </OptionButton>
        </Grid>
        <Dialog onClose={handleClose} open={open} >
            <Box className={classes.dialog} padding="2em">
                <Stepper activeStep={activeStep}>
                    {steps.map((step, index) => {
                        return (<Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>)
                    })}
                </Stepper>
                {cloneElement(stepContent[activeStep], { goToNext: handleNext })}
            </Box>
        </Dialog>
    </div>)
}