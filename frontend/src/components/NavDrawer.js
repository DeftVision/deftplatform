import {
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Switch,
    FormControlLabel, Icon
} from '@mui/material';
import {
    Announcement,
    Brightness1,
    Help,
    Home,
    Insights,
    Leaderboard,
    LocalLibrary,
    Menu,
    WbSunny
} from '@mui/icons-material';
import {useState} from 'react';
import {Link} from 'react-router-dom';

const drawerWidth = 240;

export default function NavDrawer({toggleTheme, theme}) {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    }


    return (
        <Box>
            <IconButton onClick={toggleDrawer(true)}>
                <Menu/>
            </IconButton>

            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
            >
                <List sx={{alignItems: 'center'}}>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/">
                            <ListItemIcon>
                                <Home/>
                            </ListItemIcon>
                            <ListItemText primary="Home"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/dashboard">
                            <ListItemIcon>
                                <Insights/>
                            </ListItemIcon>
                            <ListItemText primary="Dashboard"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/evaluations">
                            <ListItemIcon>
                                <Leaderboard/>
                            </ListItemIcon>
                            <ListItemText primary="Evaluation"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/documents">
                            <ListItemIcon>
                                <LocalLibrary/>
                            </ListItemIcon>
                            <ListItemText primary="Documents"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/announcements">
                            <ListItemIcon>
                                <Announcement/>
                            </ListItemIcon>
                            <ListItemText primary="Announcements"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/help">
                            <ListItemIcon>
                                <Help/>
                            </ListItemIcon>
                            <ListItemText primary="Support"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <FormControlLabel
                            control={<Switch
                                checked={theme === 'dark'}
                                onChange={toggleTheme}
                                icon={<Brightness1/>}
                                checkedIcon={<WbSunny/>}
                            />}
                            label=""
                        />
                        <ListItemText primary="Mode"/>

                    </ListItem>
                </List>

            </Drawer>

        </Box>
    );
};
