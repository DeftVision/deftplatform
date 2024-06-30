import { Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, Typography, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const form_default = {
    title: "",
    subject: "",
    content: "",
    publish: false,
    priority: "",
    role: ""
}

export default function AnnouncementForm ({newAnnouncement}) {
    const [form, setForm] = useState(form_default)
    const {id} = useParams();

    useEffect(() => {
        async function editAnnouncement() {
            try {
                const response = await fetch(`http://localhost:7000/api/announce/announcement/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const _response = await response.json();
                console.log(_response);
                if (response.ok) {
                    const announcement = _response.announcement || {};
                    setForm({
                        ...form_default,
                        ...announcement
                    })
                } else {
                    console.log(_response.error);
                }

            } catch (error) {
                console.error('Error: occurred while fetching evaluation ', error);
            }
        }
        if(!newAnnouncement) {
            editAnnouncement();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let url = `http://localhost:7000/api/announce/new`;
        let method = 'POST';

        if(!newAnnouncement) {
            url = `http://localhost:7000/api/announce/update/${id}`
            method = "PATCH"
        }

        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(form),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const _response = await response.json();
        if(response.ok) {
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
                <Typography>Announcement Form</Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        id="announcement-title"
                        type="text"
                        variant="outlined"
                        label="title"
                        name="title"
                        fullWidth
                        autoComplete="announcement-title"
                        sx={{ marginBottom: 3, marginTop: 3 }}
                        value={form.title}
                        onChange={handleChange}
                    />
                    <TextField
                        id="announcement-subject"
                        type="text"
                        variant="outlined"
                        label="subject"
                        name="subject"
                        fullWidth
                        autoComplete="announcement-subject"
                        sx={{ marginBottom: 3}}
                        value={form.subject}
                        onChange={handleChange}
                    />
                    <TextField
                        id="announcement-content"
                        type="text"
                        variant="outlined"
                        label="content"
                        name="content"
                        fullWidth
                        multiline
                        maxRows={10}
                        autoComplete="announcement-content"
                        sx={{ marginBottom: 3}}
                        value={form.content}
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
                        >
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="User">Users</MenuItem>
                            <MenuItem value="Evaluators">Evaluators</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{marginBottom: 3}}>
                        <InputLabel id="priority">priority</InputLabel>
                        <Select
                            id="priority"
                            label="priority"
                            value={form.priority}
                            name="priority"
                            sx={{textAlign: 'start'}}
                            onChange={handleChange}
                        >
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        control={<Switch
                            checked={form.publish}
                            name="publish"
                            onChange={handleChange}
                        />}
                        label="publish"
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

