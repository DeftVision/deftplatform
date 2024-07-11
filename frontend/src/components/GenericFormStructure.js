import { Box, FormControlLabel, Slider, Switch, TextField } from '@mui/material';

export default function GenericFormStructure({ form_fields, handleChange }) {
    const formComponents = {
        text: (form_field) => (
            <TextField
                key={form_field.name}
                type="text"
                variant="outlined"
                label={form_field.title}
                name={form_field.name}
                multiline
                fullWidth
                onChange={(e) => handleChange(form_field.name, e.target.value)}
                sx={{ marginBottom: 3 }}
            />
        ),
        slider: (form_field) => (
            <Box key={form_field.name} sx={{ marginBottom: 3 }}>
                <Slider
                    name={form_field.name}
                    valueLabelDisplay="auto"
                    min={0}
                    max={10}
                    onChange={(e, value) => handleChange(form_field.name, value)}
                />
            </Box>
        ),
        switch: (form_field) => (
            <FormControlLabel
                key={form_field.name}
                control={<Switch name={form_field.name} onChange={(e) => handleChange(form_field.name, e.target.checked)} />}
                label={form_field.title}
                sx={{ marginBottom: 3 }}
            />
        ),
    };

    return (
        <Box>
            {form_fields.map((form_field) => formComponents[form_field.type](form_field))}
        </Box>
    );
}
