import { styled, useTheme } from '@mui/material/styles';
import { Box, CssBaseline, Divider, Drawer, FormControlLabel, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, Toolbar, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import {
    AdminPanelSettings,
    AssignmentSharp,
    Brightness1,
    ChevronLeft,
    Home,
    Help,
    Leaderboard,
    Menu,
    WbSunny,
} from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import UserContext from '../components/UserContext';
import cookies from 'js-cookie'


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function NavDrawer({toggleTheme, theme}) {
    const {user, setUser } = useContext(UserContext);
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function logout() {
        setUser(null)
        cookies.remove('userCookie')
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Company Logo
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? "" : <ChevronLeft />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List sx={{textAlign: 'end'}}>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/">
                            <ListItemIcon><Home /></ListItemIcon>
                            <ListItemText primary="Home"/>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/evaluations">
                            <ListItemIcon><Leaderboard /></ListItemIcon>
                            <ListItemText primary="Evaluations"/>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/documents">
                            <ListItemIcon><AssignmentSharp /></ListItemIcon>
                            <ListItemText primary="Docs & Forms"/>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{marginBottom: 1}}>
                        <ListItemButton component={Link} to="/tickets">
                            <ListItemIcon><Help /></ListItemIcon>
                            <ListItemText primary="Help"/>
                        </ListItemButton>
                    </ListItem>

                    {user && (
                        <ListItem disablePadding sx={{marginBottom: 2}}>
                            <ListItemButton component={Link} onClick={logout}>
                                <ListItemIcon><LogoutIcon /></ListItemIcon>
                                <ListItemText primary="Logout"/>
                            </ListItemButton>
                        </ListItem>
                    )}

                    {user && user.role === 'Admin' && (
                        <ListItem disablePadding sx={{marginTop: 2}}>
                            <ListItemButton component={Link} to="/administration">
                                <ListItemIcon><AdminPanelSettings /></ListItemIcon>
                                <ListItemText primary="Admin"/>
                            </ListItemButton>
                        </ListItem>
                    )}

                    <ListItem>
                        <FormControlLabel
                            control={<Switch
                                checked={theme === 'dark'}
                                onChange={toggleTheme}
                                icon={<Brightness1/>}
                                checkedIcon={<WbSunny/>}
                            />}
                            label="Mode"
                        />
                    </ListItem>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
            </Main>
        </Box>
    );
}