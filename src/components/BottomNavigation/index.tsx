import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Home, Info, CalendarToday} from '@mui/icons-material/';
import styles from './style.module.scss'
import { useHistory, useLocation } from 'react-router-dom';

type Tab = {
    route: string;
    icon: React.ReactElement

}
export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);
    const location = useLocation();
    let history = useHistory();

    const tabs: Tab[] = [{ route: "/home", icon: <Home /> }, { route: "/survey", icon: <CalendarToday /> }, { route: "/information", icon: <Info /> }]

    const handleClick = (tab : Tab,index : number) => {
        setValue(index);
        history.push(tab.route);
    }

    return (
        <Box className={styles.container}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                {tabs.map((tab, index) => <BottomNavigationAction className={styles.tab} key={`tab-${index}`} onClick={()=>{handleClick(tab,index)}} icon={tab.icon} />)}

            </BottomNavigation>
        </Box>
    );
}