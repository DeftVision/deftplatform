import {
    AppBar,
    Box,
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
import { useState, useContext } from 'react';
import UserContext from '../components/UserContext';
import { Link } from 'react-router-dom';
import cookies from "js-cookie";

const drawerWidth = 240;
const miniDrawerWidth = 60;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${miniDrawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function NavDrawer({ toggleTheme, theme }) {
    const [open, setOpen] = useState(false);
    const { user, setUser } = useContext(UserContext);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function logout() {
        setUser(null);
        cookies.remove('userCookie');
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer,
                    transition: (theme) => theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    marginLeft: open ? drawerWidth : miniDrawerWidth,
                    width: `calc(100% - ${open ? drawerWidth : miniDrawerWidth}px)`
                }}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerOpen}
                        sx={{ marginRight: 2, ...(open && { display: 'none' }) }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">Your Application</Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: open ? drawerWidth : miniDrawerWidth,
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    boxSizing: 'border-box',
                    '& .MuiDrawer-paper': {
                        width: open ? drawerWidth : miniDrawerWidth,
                        transition: (theme) => theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                        overflowX: 'hidden',
                    },
                }}
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronRight /> : <ChevronLeft />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <Typography sx={{ textAlign: 'center', marginTop: 2, marginBottom: 2 }}>{user?.name || 'User Name'}</Typography>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/">
                            <ListItemIcon>
                                <Home />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/dashboard">
                            <ListItemIcon>
                                <Insights />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/evaluations">
                            <ListItemIcon>
                                <Leaderboard />
                            </ListItemIcon>
                            <ListItemText primary="Evaluation" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/documents">
                            <ListItemIcon>
                                <LocalLibrary />
                            </ListItemIcon>
                            <ListItemText primary="Documents" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/users">
                            <ListItemIcon>
                                <Person />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/announcements">
                            <ListItemIcon>
                                <Announcement />
                            </ListItemIcon>
                            <ListItemText primary="Announcements" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/tickets">
                            <ListItemIcon>
                                <Help />
                            </ListItemIcon>
                            <ListItemText primary="Support" />
                        </ListItemButton>
                    </ListItem>
                    {user && user.role === 'Admin' && (
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/admin">
                                <ListItemIcon>
                                    <ShieldRounded />
                                </ListItemIcon>
                                <ListItemText primary="Administration" />
                            </ListItemButton>
                        </ListItem>
                    )}
                    {user && (
                        <ListItem disablePadding>
                            <ListItemButton component={Link} onClick={logout}>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </ListItem>
                    )}
                    <ListItem>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={theme === 'dark'}
                                    onChange={toggleTheme}
                                    icon={<Brightness1 />}
                                    checkedIcon={<WbSunny />}
                                />
                            }
                            label="Mode"
                        />
                    </ListItem>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {/* Rest of your content */}
            </Main>
        </Box>
    );
};
