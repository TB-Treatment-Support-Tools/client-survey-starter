import classes from './styles.module.scss'
import { useKeycloak } from '@react-keycloak/web';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

export default function TopBar() {
    const { keycloak } = useKeycloak()

    const isProvider = keycloak?.hasRealmRole('provider')

    const logout = useCallback(() => {
        keycloak?.logout()
    }, [keycloak])

    return (<>
        <div className={classes.topBar}>
            <span>Treatment Tracker</span>
            <div className={classes.providerNav}>
                <Link to="/home">Home</Link>
                <Link to="/add-patient">Add Patient</Link>
                <Link to="/patients">Patients</Link>
                <Link to="/chat">Chat</Link>
                <p>Hello</p>
            </div>
        </div>
    </>
    )
}