import { Drawer } from '@mui/material';
import { useKeycloak } from '@react-keycloak/web';
import { useCallback, useContext } from 'react';
import { deleteMedAdmin, getTodaysMedAdmin, seedPatientData } from '../../api/patient';
import UserContext from '../../context/user-context';
import classes from './styles.module.scss'

interface Props {
    drawerOpen: boolean,
    setDrawerOpen: (isOpen: boolean) => void
}

export default function SideDrawer({ drawerOpen, setDrawerOpen }: Props) {

    const { keycloak } = useKeycloak()

    const {user} = useContext(UserContext)

    const logout = useCallback(() => {
        keycloak?.logout()
    }, [keycloak])

    const closeDrawer = () => { setDrawerOpen(false) }

    const getUsername = () => {
        const token: any = keycloak.tokenParsed
        return token.preferred_username || "Unset"
    }

    const deleteTodaysMedAdmin = async () => {
        if(user?.id){
            let results = await getTodaysMedAdmin(user.id)
            results.forEach( result => {
                result.id && deleteMedAdmin(result.id)
            })
        }
        
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
                <button onClick={deleteTodaysMedAdmin}>Delete todays entry</button>
            </div>
        </Drawer>
    )
}