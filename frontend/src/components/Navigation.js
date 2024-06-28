import { AppBar, FormControlLabel, IconButton, List, ListItem, Switch, Toolbar, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
import {Menu, DarkMode, WbSunny} from "@mui/icons-material";


export default function Navigation({ toggleTheme, theme }) {
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
                </List>
                <FormControlLabel
                    control={<Switch
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                        icon={<DarkMode />}
                        checkedIcon={<WbSunny />}
                    />}
                    label=""
                    sx={{ marginLeft: 'auto' }}
                />
            </Toolbar>
        </AppBar>
    );
};

