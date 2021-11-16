import { useContext, useState } from "react";
import UserContext from "../../context/user-context";
import { getFhirFirstName } from "../../utility/fhir-utilities";
import classes from './styles.module.scss'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import { AccountCircle } from "@mui/icons-material";
import SideDrawer from "../SideDrawer";


export default function UserGreeting() {
    const { user } = useContext(UserContext)
    const firstName = user?.name ? getFhirFirstName(user.name) : "No name found"
    const [drawerOpen,setDrawerOpen] = useState<boolean>(false);

    const openDrawer = () => {setDrawerOpen(true)}

    return (
        <>
        <Grid alignItems="center" wrap="nowrap" className={classes.greeting} container>
            <div>
                <span>Good Afternoon, <br /> {firstName}</span>
            </div>
            <Grid alignItems="center" className={classes.accountButton} direction="column" container>
            <IconButton aria-label="profile" onClick={openDrawer}>
                <AccountCircle />
            </IconButton>
            <span className={classes.accountLabel}>Account</span>
            </Grid>
        </Grid>
        <SideDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        </>
    )
}