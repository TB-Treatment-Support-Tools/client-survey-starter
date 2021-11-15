import { Drawer } from '@mui/material';
import { useKeycloak } from '@react-keycloak/web';
import { useCallback } from 'react';
import classes from './styles.module.scss'

interface Props {
    drawerOpen: boolean,
    setDrawerOpen: (isOpen: boolean) => void
}

export default function SideDrawer({ drawerOpen, setDrawerOpen }: Props) {

    const { keycloak } = useKeycloak()

    const isProvider = keycloak?.hasRealmRole('provider')

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
            </div>
        </Drawer>
    )
}