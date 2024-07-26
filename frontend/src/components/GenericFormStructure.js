import { Box, FormControlLabel, Slider, Switch, TextField } from '@mui/material';


// TODO: new error thrown. 'Cannot read properties of undefined(reading 'name')'


const value_defaults = {
    text: "",
    slider: 0,
    switch: true
}

export default function GenericFormStructure({ form_fields, setFormData, formData }) {
    const form_defaults = {}

    for (let i = 0; i < form_fields.length; i++ ) {
        const field = form_fields[i];
        form_defaults[field.name] = value_defaults[field.type];
    }



    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const formComponents = {
        text: (form_field) => (
            <TextField
                key={form_field.name}
                type="text"
                variant="outlined"
                label={form_field.title}
                name={form_field.name}
                value={formData.name}
                multiline
                fullWidth
                onChange={(e) => handleChange(form_field.name, e.target.value)}
                sx={{ marginBottom: 3 }}
            />
        ),
        slider: (form_field) => (
            <Box key={form_field.name} sx={{ marginBottom: 3 }}>
                <Slider
                    value={formData[form_field.name]}
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
                control={<Switch checked={formData[form_field.name]} name={form_field.name} onChange={(e) => handleChange(form_field.name, e.target.checked)} />}
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
