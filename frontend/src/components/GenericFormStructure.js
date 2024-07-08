import { Box, Button, FormControlLabel, Slider, Stack, Switch, TextField } from '@mui/material';
import { useState } from 'react';
import {useNotification} from "./NotificationContext";
import * as _response from "react-dom/test-utils";



export default function GenericFormStructure ({form_fields}) {
    const [formData, setFormData] = useState({});
    const showNotification = useNotification();

    const handleChange = (name, value ) => {
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:7000/api/form/submit-form`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const _response = await response.json();

            if(response.ok) {
                showNotification(_response.message, 'success');
            } else {
                showNotification(_response.message || 'Error saving form', 'error');
            }
        }
        catch (error) {
            showNotification('Error saving form', 'error');
        }
    }


    const formComponents = {
        text: (form_field) => <TextField
            type="text"
            variant="outlined"
            label={form_field.title}
            name={form_field.name}
            multiline
            fullWidth
            sx={{marginBottom: 3}}
        />,
        slider: (form_field) => <Slider
            name={form_field.name}
            valueLabelDisplay="auto"
            min={0}
            max={10}
        />,
        switch: (form_field) => <FormControlLabel
            control={<Switch
                name={form_field.name}

            />}
            label={form_field.title}
            sx={{marginBottom: 3}}
        />,
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box>
                {form_fields.map(form_field => formComponents[form_field.type](form_field))}
            </Box>
            <Button variant="outlined" type="submit">Save</Button>
        </form>
    );
}

