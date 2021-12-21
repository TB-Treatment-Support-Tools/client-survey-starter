import { Check, Clear } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/system'
import { DateTime } from 'luxon'
import { useContext, useState } from 'react'
import { addMedicationAdministration } from '../../api/patient'
import UserContext from '../../context/user-context'
import { getMedicationIdFromCarePlan } from '../../utility/fhir-utilities'
import SectionTitle from '../Text/SectionTitle'
import classes from './styles.module.scss'

export default function ReportMedAdmin() {

    const { user, carePlan, medicationDates } = useContext(UserContext);
    const [value,setValue] = useState<boolean | null>(null);

    const medicationID = () => {
        return getMedicationIdFromCarePlan(carePlan)
    }
    const handleYes = () => {
        const idForUpload = medicationID();
        if(user?.resourceType === "Patient" && user.id && idForUpload){
            addMedicationAdministration(user.id,idForUpload);
        }
    }

    const handleNo = () => {
        console.log("Didnt take meds")
    }

    const hasAlreadyReported = !!medicationDates?.get(DateTime.local().toISODate())

    return (
        <Box padding="1em">
            <SectionTitle>Have you taken your medication today?</SectionTitle>
            {hasAlreadyReported ? <p>You already reported today, check back tomorrow!</p> : <Grid className={classes.container} container>
                <IconButton onClick={handleYes} className={classes.yes}>
                    <Check />
                </IconButton>
                <Box width="1em" />
                <IconButton onClick={handleNo} className={classes.no}>
                    <Clear />
                </IconButton>
            </Grid>}
        </Box>
    )
}