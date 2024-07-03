import { Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, Typography, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useNotification} from "../components/NotificationContext";


const form_default = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    location: "",
    active: false
}


export default function UserForm ({newUser}) {
    const [form, setForm] = useState(form_default);
    const showNotification = useNotification();
    const {id} = useParams();

    useEffect(() => {
        async function editUser() {
            try {
                const response = await fetch(`http://localhost:7000/api/user/user/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const _response = await response.json();
                if(response.ok) {
                    const user = _response.user || {};
                    setForm({
                        ...form,
                        ...user
                    })
                } else {
                    console.log(_response.error);
                }
            } catch (error) {
                console.log("Error occurred while fetching user", error)
            }
        }
        if(!newUser) {
            editUser();
        }
    }, [id]);

    const validateFields = () => {
        const requiredFields = ['firstName', 'lastName', 'email', 'password', 'role', 'location'];
        for(let field of requiredFields) {
            if(!form[field]) {
                return false;
            }
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validateFields()) {
            showNotification('All fields are required', 'error')
            return;
        }

        try {
            let url = `http://localhost:7000/api/user/new`;
            let method = 'POST'

            if(!newUser) {
                url = `http://localhost:7000/api/user/user/${id}`
                method = 'PATCH'
            }

            const response = await fetch(url, {
                method: method,
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const _response = await response.json();
            if(response.ok) {
                console.log(_response.message);
                showNotification(_response.message, 'success')
            }
            if(!response.ok && _response.user) {
                showNotification(_response.message, 'error');
            }
        } catch (error) {
            console.error(error)
            showNotification('Error saving form!!', 'error')
        }
    }

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        })
    }


    return (
        <>
            <Box>
                <Typography>User Form</Typography>
            </Box>
            <Box>
                <form onSubmit={handleSubmit} noValidate>
                    <TextField
                        id="first-name"
                        type="text"
                        variant="outlined"
                        label="first name"
                        name="firstName"
                        fullWidth
                        autoComplete="user-firstName"
                        sx={{marginBottom: 3, marginTop: 3}}
                        value={form.firstName}
                        onChange={handleChange}
                    />

                    <TextField
                        id="last-name"
                        type="text"
                        variant="outlined"
                        label="last name"
                        name="lastName"
                        fullWidth
                        autoComplete="user-lastName"
                        sx={{marginBottom: 3}}
                        value={form.lastName}
                        onChange={handleChange}
                    />

                    <TextField
                        id="email"
                        type="email"
                        variant="outlined"
                        label="email"
                        name="email"
                        fullWidth
                        autoComplete="user-email"
                        sx={{marginBottom: 3}}
                        value={form.email}
                        onChange={handleChange}
                    />

                    <TextField
                        id="password"
                        type="password"
                        variant="outlined"
                        label="password"
                        name="password"
                        fullWidth
                        autoComplete="user-password"
                        sx={{marginBottom: 3}}
                        value={form.password}
                        onChange={handleChange}
                    />

                    <FormControl fullWidth sx={{marginBottom: 3}}>
                        <InputLabel id="role">role</InputLabel>
                        <Select
                            id="role"
                            label="role"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            sx={{textAlign: 'start'}}
                            autoComplete="user-role"
                        >
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="User">Users</MenuItem>
                            <MenuItem value="Evaluator">Evaluator</MenuItem>
                            <MenuItem value="owner">owner</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{marginBottom: 3}}>
                        <InputLabel id="location-label" required>location</InputLabel>
                        <Select
                            labelId="location-label"
                            id="location"
                            label="Location"
                            name="location"
                            value={form.location}
                            sx={{textAlign: 'start'}}
                            onChange={handleChange}
                            autoComplete="user-location"
                        >
                            <MenuItem value="location 1">location 1</MenuItem>
                            <MenuItem value="location 2">Location 2</MenuItem>
                            <MenuItem value="location 3">Location 3</MenuItem>
                            <MenuItem value="home">home</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        control={<Switch
                            checked={form.active}
                            name="active"
                            onChange={handleChange}
                        />}
                        label="active"
                        sx={{ marginBottom: 3}}
                    />

                    <Box>
                        <Button
                            id="submit-button"
                            variant="outlined"
                            type="submit"
                        >
                            SAVE
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    );
};

