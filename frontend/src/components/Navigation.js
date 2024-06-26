import { AppBar, IconButton, List, ListItem, styled, Toolbar, ListItemButton } from '@mui/material';
import { Help } from '@mui/icons-material';
import { Menu } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


export default function Navigation() {
    const [showMenu, setShowMenu] = useState(null);

    const toggleShowMenu = (e) => {

    }

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton>
                    <Menu sx={{color: 'white'}} />
                </IconButton>
                <List sx={{display: 'inline-flex' }}>
                    <ListItem disablePadding>
                        <ListItemButton variant="text" component={Link} to="/">
                            Home
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton variant="text" component={Link} to="/documents">
                            Documents
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton variant="text" component={Link} to="/admin">
                            Admin
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton variant="text" component={Link} to="/settings">
                            Settings
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton variant="text" component={Link} to="/help">
                           <Help />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Toolbar>
        </AppBar>
    );
};

