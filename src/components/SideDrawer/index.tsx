import { Drawer } from '@mui/material';
import { useKeycloak } from '@react-keycloak/web';
import { useCallback } from 'react';
import { seedPatientData } from '../../api/patient';
import classes from './styles.module.scss'

interface Props {
    drawerOpen: boolean,
    setDrawerOpen: (isOpen: boolean) => void
}

export default function SideDrawer({ drawerOpen, setDrawerOpen }: Props) {

    const { keycloak } = useKeycloak()

    const logout = useCallback(() => {
        keycloak?.logout()
    }, [keycloak])

    const closeDrawer = () => { setDrawerOpen(false) }

    const getUsername = () => {
        const token: any = keycloak.tokenParsed
        return token.preferred_username || "Unset"
    }

    return (
        <Drawer
            classes={{ paper: classes.drawer }}
            anchor={'right'}
            open={drawerOpen}
            onClose={closeDrawer}
        >
            <div className={classes.menuContent}>
                {keycloak?.authenticated && <button onClick={logout}>Logout</button>}
                {keycloak?.authenticated && <h1>You are logged in as: {getUsername()} </h1>}
                <button onClick={closeDrawer}>Close This {">"}</button>
                <button onClick={()=>{seedPatientData("1","311")}}>Seed Patient MedAdmin Data</button>
            </div>
        </Drawer>
    )
}