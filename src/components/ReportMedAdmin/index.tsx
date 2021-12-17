import { Check, Clear } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/system'
import { useContext } from 'react'
import UserContext from '../../context/user-context'
import SectionTitle from '../Text/SectionTitle'
import classes from './styles.module.scss'

export default function ReportMedAdmin() {

    const { user } = useContext(UserContext);

    const handleYes = () => {
        console.log("Yes I took meds")
    }

    const handleNo = () => {
        console.log("Didnt take meds")
    }

    return (
        <Box padding="1em">
            <SectionTitle>Have you taken your medication today?</SectionTitle>
            <Grid className={classes.container} container>
                <IconButton onClick={handleYes} className={classes.yes}>
                    <Check />
                </IconButton>
                <Box width="1em" />
                <IconButton onClick={handleNo} className={classes.no}>
                    <Clear />
                </IconButton>
            </Grid>
        </Box>
    )
}