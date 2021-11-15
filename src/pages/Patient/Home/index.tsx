import { useKeycloak } from '@react-keycloak/web';
import UserGreeting from '../../../components/UserGreeting';
import classes from './styles.module.scss'
import Grid from '@mui/material/Grid'
import { KeyboardArrowRightOutlined } from '@mui/icons-material';
import SectionTitle from '../../../components/Text/SectionTitle';


export default function Home() {
    const { keycloak } = useKeycloak()

    const isProvider = keycloak?.hasRealmRole('provider')

    return (
        <section>
            <UserGreeting />
            <SectionTitle>Check-In</SectionTitle>
            <div className={classes.lastCheckIn}>
                <span className={classes.lastReport}>You last reported 6 days ago. How have you been since then?</span>
            </div>
            <div className={classes.reportNow}>

                <Grid alignItems="center" justifyContent="space-between" container>
                    <span>Report Now</span>
                    <KeyboardArrowRightOutlined />
                </Grid>

            </div>
        </section>)
}