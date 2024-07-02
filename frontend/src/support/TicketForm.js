import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

const form_default = {
    ticketId: "",
    title: "",
    description: "",
    location: "",
    email: "",
    urgency: "",
    ticketStatus: "",
    archive: false,
}

export default function TicketForm({newTicket}) {
    const [form, setForm] = useState({form_default});
    const {id} = useParams();

    useEffect(() => {
        async function editSupportTicket() {
            try {
                const response = await fetch(`http://localhost:7000/api/support/ticket/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const _response = await response.json();
                if (response.ok) {
                    const ticket = _response.ticket || {};
                    setForm({
                        ...form_default,
                        ...ticket
                    })
                } else {
                    console.log(_response.error);
                }
            } catch (error) {
                console.error("Error occurred while fetching support ticket", error);
            }
        }

        if (!newTicket) {
            editSupportTicket()
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let url = `http://localhost:7000/api/support/new`;
        let method = 'POST';

        if (!newTicket) {
            url = `http://localhost:7000/api/support/update/${id}`;
            method = "PATCH"
        }

        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const _response = await response.json();
        if (response.ok) {
            console.log(_response.message);
        } else {
            console.log(_response.error);
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
                <Typography>Support Tickets</Typography>
                <Typography sx={{textAlign: 'start'}}>Ticket Number: </Typography>
                <form onSubmit={handleSubmit} noValidate>
                    <TextField
                        id="support-ticketId"
                        type="text"
                        variant="outlined"
                        label="ticket number"
                        name="ticketId"
                        fullWidth
                        autoComplete="support-ticketId"
                        sx={{marginBottom: 3, marginTop: 3}}
                        value={form.ticketId}
                        onChange={handleChange}
                    />
                    <TextField
                        id="support-title"
                        type="text"
                        variant="outlined"
                        label="title"
                        name="title"
                        fullWidth
                        autoComplete="support-title"
                        sx={{marginBottom: 3, marginTop: 3}}
                        value={form.title}
                        onChange={handleChange}
                    />

                    <TextField
                        id="support-description"
                        type="text"
                        variant="outlined"
                        label="description"
                        name="description"
                        fullWidth
                        multiline
                        autoComplete="support-description"
                        sx={{marginBottom: 3}}
                        value={form.description}
                        onChange={handleChange}
                    />

                    <FormControl fullWidth sx={{marginBottom: 3}}>
                        <InputLabel id="location-label">location</InputLabel>
                        <Select
                            labelId="location-label"
                            id="location"
                            label="Location"
                            name="location"
                            value={form.location}
                            sx={{textAlign: 'start'}}
                            onChange={handleChange}
                        >
                            <MenuItem value="location 1">location 1</MenuItem>
                            <MenuItem value="location 2">Location 2</MenuItem>
                            <MenuItem value="location 3">Location 3</MenuItem>
                        </Select>
                    </FormControl>

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
                    />

                    <FormControl fullWidth sx={{marginBottom: 3}}>
                        <InputLabel id="priority">urgency</InputLabel>
                        <Select
                            id="urgency"
                            label="urgency"
                            value={form.urgency}
                            name="urgency"
                            sx={{textAlign: 'start'}}
                            onChange={handleChange}
                        >
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                    </FormControl>


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