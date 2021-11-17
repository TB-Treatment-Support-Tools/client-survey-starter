import UserGreeting from '../../../components/UserGreeting';
import classes from './styles.module.scss'
import Grid from '@mui/material/Grid'
import { AddCircle, KeyboardArrowRightOutlined, Lightbulb } from '@mui/icons-material';
import SectionTitle from '../../../components/Text/SectionTitle';
import { Box } from '@mui/system';
import { Link, useLocation } from 'react-router-dom';
import LearningPreview from '../../../components/LearningPreview';
import CheckIn from '../../CheckIn';


export default function PatientHome() {

    const location = useLocation();
    const isSurvey = location.pathname.split("/")[1] === "survey"

    return (
        <>
        {isSurvey && <CheckIn />}
        <section>
            <UserGreeting />
            <div className={classes.item}>
                <SectionTitle>
                    <AddCircle />
                    <span>Check-In</span>
                </SectionTitle>
                <div className={classes.lastCheckIn}>
                    <span className={classes.lastReport}>You last reported 6 days ago. How have you been since then?</span>
                </div>
                <Link style={{ textDecoration: "none" }} to="/survey/1">
                    <div className={classes.reportNow}>
                        <Grid alignItems="center" justifyContent="space-between" container>
                            <span>Report Now</span>
                            <KeyboardArrowRightOutlined />
                        </Grid>
                    </div>
                </Link>
            </div>
            <Box padding="1em">
                <SectionTitle>
                    <Lightbulb />
                    <span>Learn More</span>
                </SectionTitle>
                <LearningPreview />
            </Box>
        </section>
        </>)
}