import { Box, Button, FormControlLabel, Switch, Typography, TextField } from '@mui/material';
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
            const response = await fetch(`http://localhost:7000/api/announce/announcement/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const _response = await response.json();
            if(!response.ok) {
                console.log(_response.error);
            }
            if(response.ok) {
                const {title, subject, content, publish, role, priority} = _response.announcement;
                setForm({title, subject, content, publish, role, priority})
            }
        }
        if(!newAnnouncement) {
            editAnnouncement();
        }
    }, [id])

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

    const handlePublishSwitch = (e) => {
        setForm({
            ...form,
            publish: e.target.checked
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
                        fullWidth
                        autoComplete="announcement title"
                        sx={{ marginBottom: 3, marginTop: 3 }}
                        value={form.title}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                title: e.target.value,
                            })
                        }}
                    />
                    <TextField
                        id="announcement-subject"
                        type="text"
                        variant="outlined"
                        label="subject"
                        fullWidth
                        autoComplete="announcement subject"
                        sx={{ marginBottom: 3}}
                        value={form.subject}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                subject: e.target.value,
                            })
                        }}
                    />
                    <TextField
                        id="announcement-content"
                        type="text"
                        variant="outlined"
                        label="content"
                        fullWidth
                        autoComplete="announcement content"
                        sx={{ marginBottom: 3}}
                        value={form.content}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                content: e.target.value,
                            })
                        }}
                    />
                    <TextField
                        id="announcement-role"
                        type="text"
                        variant="outlined"
                        label="role"
                        fullWidth
                        autoComplete="announcement role"
                        sx={{ marginBottom: 3}}
                        value={form.role}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                role: e.target.value,
                            })
                        }}
                    />
                    <TextField
                        id="announcement-priority"
                        type="text"
                        variant="outlined"
                        label="priority"
                        fullWidth
                        autoComplete="announcement priority"
                        sx={{ marginBottom: 3}}
                        value={form.priority}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                priority: e.target.value,
                            })
                        }}
                    />
                    <FormControlLabel
                        control={<Switch
                            checked={form.publish}
                            onChange={handlePublishSwitch}
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

