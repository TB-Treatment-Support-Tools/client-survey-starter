import classes from './styles.module.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import IconButton from '@mui/material/IconButton'
import useToggle from '../../hooks/useToggle'
import { Drawer } from '@mui/material';
import { useKeycloak } from '@react-keycloak/web';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

export default function TopBar() {
    const { keycloak } = useKeycloak()
    const [menuVisible, toggleMenuVisible] = useToggle(false);

    const isProvider = keycloak?.hasRealmRole('provider')

    const logout = useCallback(() => {
        keycloak?.logout()
    }, [keycloak])

    const getUsername = () => {
        const token: any = keycloak.tokenParsed
        return token.preferred_username || "Unset"
    }

    return (<>
        <div className={classes.topBar}>
            <span>Treatment Tracker</span>
            <Link to="/home">Home</Link>
            {isProvider && <div className={classes.providerNav}>
                <Link to="/add-patient">Add Patient</Link>
                <Link to="/patients">Patients</Link>
                <Link to="/chat">Chat</Link>
            </div>}
            <IconButton className={classes.account} aria-label="account" onClick={() => { toggleMenuVisible() }}>
                <AccountCircleIcon />
            </IconButton>
        </div>
        <Drawer
            classes={{ paper: classes.width }}
            anchor={'right'}
            open={menuVisible}
            onClose={toggleMenuVisible}
        >
            <div className={classes.menuContent}>
                {keycloak?.authenticated && <button onClick={logout}>Logout</button>}
                {keycloak?.authenticated && <h1>You are logged in as: {getUsername()} </h1>}
                <button onClick={toggleMenuVisible}>Close This {">"}</button>
            </div>
        </Drawer>
    </>
    )
}