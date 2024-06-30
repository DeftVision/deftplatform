import { Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, Typography, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const form_default = {
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    location: "",
    active: false
}


export default function UserForm ({newUser}) {
    const [form, setForm] = useState(form_default);
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
                        ...form_default,
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


    const handleSubmit = async (e) => {
        e.preventDefault();

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
            } else {
                console.error(_response.error);
            }

        } catch (error) {
            console.error('Error', error)
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
                <form onSubmit={handleSubmit}>
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
                        required
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
                        required
                    />

                    <TextField
                        id="email"
                        type="email"
                        variant="outlined"
                        label="email"
                        name="email"
                        fullWidth
                        autoComplete="email"
                        sx={{marginBottom: 3}}
                        value={form.email}
                        onChange={handleChange}
                        required
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
                            noValidate
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

