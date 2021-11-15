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
        <Grid className={classes.greeting} container>
            <div>
                <p>Good Afternoon, <br /> {firstName}</p>
            </div>
            <IconButton className={classes.accountButton} aria-label="profile" onClick={openDrawer}>
                <AccountCircle />
            </IconButton>
        </Grid>
        <SideDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        </>
    )
}