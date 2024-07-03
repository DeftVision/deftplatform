import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    Divider,
    Drawer,
    FormControlLabel,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    styled,
    Switch,
    Toolbar,
    Typography,
} from '@mui/material';
import {
    Announcement,
    Brightness1,
    ChevronLeft,
    ChevronRight,
    Help,
    Home,
    Insights,
    Leaderboard,
    LocalLibrary,
    Menu,
    Person,
    ShieldRounded,
    WbSunny
} from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import {useState, useContext} from 'react';
import UserContext from '../components/UserContext';
import {Link} from 'react-router-dom';
import cookies from "js-cookie";

const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
}))

export default function NavDrawer({toggleTheme, theme}) {
    const [open, setOpen] = useState(false);
    const {user, setUser} = useContext(UserContext);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    }

    function logout() {
        setUser(null);
        cookies.remove('userCookie');
    }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        onClick={toggleDrawer(true)}
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none'})
                        }}
                    >
                        <Menu/>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
            >
                <List sx={{alignItems: 'center'}}>
                <Typography sx={{textAlign: 'center', marginTop: 2, marginBottom: 2}}>User Name</Typography>
                    <Divider />


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
                        <ListItemButton component={Link} to="/users">
                            <ListItemIcon>
                                <Person/>
                            </ListItemIcon>
                            <ListItemText primary="Users"/>
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
                        <ListItemButton component={Link} to="/tickets">
                            <ListItemIcon>
                                <Help/>
                            </ListItemIcon>
                            <ListItemText primary="Support"/>
                        </ListItemButton>
                    </ListItem>

                    {user && user.role === 'Admin' && (
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/admin">
                            <ListItemIcon>
                                <ShieldRounded />
                            </ListItemIcon>
                            <ListItemText primary="Administration"/>
                        </ListItemButton>
                    </ListItem>
                    )}

                    {user &&
                    <ListItem disablePadding>
                        <ListItemButton component={Link} onClick={logout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout"/>
                        </ListItemButton>
                    </ListItem>}
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

