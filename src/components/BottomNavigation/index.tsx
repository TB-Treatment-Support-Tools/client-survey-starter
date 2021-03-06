import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Home, Info, CalendarToday, Chat } from '@mui/icons-material/';
import styles from './style.module.scss'
import { useHistory, useLocation } from 'react-router-dom';

type Tab = {
    route: string;
    icon: React.ReactElement,
    text: string

}
const tabs: Tab[] = [{ route: "/home", icon: <Home />, text: "Home" }, { route: "/progress", icon: <CalendarToday />, text: "progress"  }, { route: "/chat", icon: <Chat />,text: "Support"  }]

export default function SimpleBottomNavigation() {
    
    const location = useLocation();
    const getInitalTab = (): number => {
        const tab = tabs.findIndex( tab => {return location.pathname.startsWith(tab.route)});
        return tab > 0 ? tab : 0;
    }

    const [value, setValue] = React.useState(getInitalTab());

    let history = useHistory();



    const handleClick = (tab: Tab, index: number) => {
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
                }}>
                {tabs.map((tab, index) => <BottomNavigationAction classes={{selected: styles.selected}} label={tab.text} className={styles.tab} key={`tab-${index}`} onClick={() => { handleClick(tab, index) }} icon={tab.icon} />)}
            </BottomNavigation>
        </Box>
    );
}