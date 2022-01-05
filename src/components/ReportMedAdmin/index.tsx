import { Check, Clear } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/system'
import { MedicationAdministration } from 'fhir/r4'
import { useContext, useEffect, useState } from 'react'
import { addMedicationAdministration, getTodaysMedAdmin } from '../../api/patient'
import UserContext from '../../context/user-context'
import { getMedicationIdFromCarePlan } from '../../utility/fhir-utilities'
import Loading from '../Loading'
import SectionTitle from '../Text/SectionTitle'
import classes from './styles.module.scss'

export default function ReportMedAdmin() {

    const [loading,setLoading] = useState<boolean>(false)
    const [todaysEntries,setTodaysEntries] = useState<MedicationAdministration[]>([])
    const { user, carePlan, medicationDates, updateMedicationDates } = useContext(UserContext)

    const getLatestMedAdmin = async () => {
        if(user?.id){
            const entries = await getTodaysMedAdmin(user.id)
            setTodaysEntries(entries)
        }
    }

    useEffect(()=>{
        getLatestMedAdmin()
    },[])

    const medicationID = () => {
        return getMedicationIdFromCarePlan(carePlan)
    }
    const handleYes = () => {
        handleSubmission(true)
    }

    const handleNo = () => {
        handleSubmission(false)
    }

    const handleSubmission = async (tookMedication : boolean) => {
        const idForUpload = medicationID()
        if(user?.id && idForUpload){
            setLoading(true)
            await addMedicationAdministration(user.id,idForUpload,tookMedication)
            !!updateMedicationDates && updateMedicationDates()
            setLoading(false)
        }
    }

    const hasAlreadyReported = todaysEntries.length > 0

    return (
        <Box padding="1em">
            {loading ? <Loading /> : <>
            <SectionTitle>Have you taken your medication today?</SectionTitle>
            {hasAlreadyReported ? <p>Great job! Please check back in tomorrow when you have taken your medication</p> : <Grid className={classes.container} container>
                <IconButton onClick={handleYes} className={classes.yes}>
                    <Check />
                </IconButton>
                <Box width="1em" />
                <IconButton onClick={handleNo} className={classes.no}>
                    <Clear />
                </IconButton>
            </Grid>}
            </>}
        </Box>
    )
}