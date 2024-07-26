import {useState} from 'react';
import GenericFormStructure from './GenericFormStructure';
import { Box, Button } from "@mui/material";

import { useNotification } from './NotificationContext';

const form_fields = [
    { type: 'text', required: true, title: 'Name of User', name: 'name' },
    { type: 'slider', required: true, title: 'Age of User', name: 'age' },
    { type: 'switch', required: false, title: 'archived', name: 'archived' }
];


export default function TestComponent() {
    const showNotification = useNotification();
    const [formData, setFormData] = useState();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:7000/api/form/new`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const _response = await response.json();

            if (response.ok) {
                showNotification(_response.message, 'success');
            } else {
                showNotification(_response.message || 'Error saving form', 'error');
            }
        }
        catch (error) {
            showNotification('Error saving form', 'error');
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
                <GenericFormStructure form_fields={form_fields} setFormData={setFormData} formData={formData} />
                <Button variant="outlined" type="submit" >Save</Button>
            </form>
        </Box>
    );
}
