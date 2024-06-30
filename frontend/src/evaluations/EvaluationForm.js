import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Input,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    Stack,
    Switch,
    TextField,
    Typography
} from '@mui/material';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
// bring in firebase shit...

const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const form_default = {
    visitDateTime: getCurrentDateTime(),
    location: "",
    evaluator: "",
    cashier: "",
    greeting: false,
    repeatOrder: false,
    upsell: false,
    patio: false,
    wait: "",
    foodScore: 0,
    appearanceScore: 0,
    serviceScore: 0,
    image: "",
    identifyManager: false,
    comments: ""
}


export default function EvaluationForm({newEvaluation}) {
    const [form, setForm] = useState(form_default);
    const {id} = useParams();

    useEffect(() => {
        async function editEvaluation() {
            try {
                const response = await fetch(`http://localhost:7000/api/eval/evaluation/${id}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                const _response = await response.json();
                console.log(_response);
                if (response.ok) {
                    const evaluation = _response.evaluation || {};
                    setForm({
                        ...form_default,
                        ...evaluation
                    })
                } else {
                    console.log(_response.error);
                }
            } catch (error) {
                console.error('Error occurred while fetching evaluation', error);
            }
        }

        if (!newEvaluation) {
            editEvaluation();
        }
    }, [id]);

    const handleChange = (e, newValue) => {
        const {name, value, type, checked} = e.target;
        if (name) {
            setForm({
                ...form,
                [name]: type === 'checkbox' ? checked : value,
            })
        } else if (typeof newValue === 'number') {
            setForm(prevForm => ({
                ...prevForm,
                [e.target.ariaLabel]: newValue
            }))
        }
    }

    const handleSliderChange = (name) => (e, newValue) => {
        setForm({
            ...form,
            [name]: newValue
        })
    }


const handleSubmit = async (e) => {
    e.preventDefault();
    let url = `http://localhost:7000/api/eval/new`
    let method = 'POST';

    if (!newEvaluation) {
        url = `http://localhost:7000/api/eval/update/${id}`
        method = "PATCH";
    }

    const response = await fetch(url, {
        method: method,
        body: JSON.stringify(form),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const _response = await response.json();
    if (response.ok) {
        console.log(_response.message);
    } else {
        console.log(_response.error);
    }
}


return (
    <>
        <Box>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="visit-date-time"
                    type="datetime-local"
                    variant="outlined"
                    label="Visit DateTime"
                    name="visitDateTime"
                    fullWidth
                    autoComplete="visit-date-time"
                    sx={{marginBottom: 3, marginTop: 3}}
                    value={form.visitDateTime}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
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
                    id="evaluation-evaluator"
                    type="text"
                    variant="outlined"
                    label="evaluator"
                    fullWidth
                    name="evaluator"
                    autoComplete="evaluation evaluator"
                    sx={{marginBottom: 3}}
                    value={form.evaluator}
                    onChange={handleChange}
                />
                <TextField
                    id="cashier"
                    type="text"
                    variant="outlined"
                    label="cashier"
                    name="cashier"
                    fullWidth
                    autoComplete="cashier-name"
                    sx={{marginBottom: 3}}
                    value={form.cashier}
                    onChange={handleChange}
                />
                <FormControlLabel
                    control={<Switch
                        checked={form.greeting}
                        name="greeting"
                        onChange={handleChange}
                    />}
                    label="Greeting"
                    sx={{marginBottom: 3}}
                />
                <FormControlLabel
                    control={<Switch
                        checked={form.repeatOrder}
                        name="repeatOrder"
                        onChange={handleChange}
                    />}
                    label="Repeat Order"
                    sx={{marginBottom: 3}}
                />
                <FormControlLabel
                    control={<Switch
                        checked={form.upsell}
                        name="upsell"
                        onChange={handleChange}
                    />}
                    label="Upsell"
                    sx={{marginBottom: 3}}
                />
                <FormControlLabel
                    control={<Switch
                        checked={form.patio}
                        name="patio"
                        onChange={handleChange}
                    />}
                    label="Patio"
                    sx={{marginBottom: 3}}
                />
                <FormControlLabel
                    control={<Switch
                        checked={form.identifyManager}
                        name="identifyManager"
                        onChange={handleChange}
                    />}
                    label="Identify Manager"
                    sx={{marginBottom: 3}}
                />

                <TextField
                    id="wait-food"
                    type="text"
                    variant="outlined"
                    label="wait [in minutes]"
                    name="wait"
                    fullWidth
                    autoComplete="wait-food"
                    sx={{marginBottom: 3}}
                    value={form.wait}
                    onChange={handleChange}
                />

                {/*<TextField
                        id="food-score"
                        type="text"
                        variant="outlined"
                        label="food score"
                        name="foodScore"
                        fullWidth
                        autoComplete="food-score"
                        sx={{ marginBottom: 3}}
                        value={form.foodScore}
                        onChange={handleChange}
                    />
                    <TextField
                    id="appearance-score"
                    type="text"
                    variant="outlined"
                    label="appearance score"
                    name="appearanceScore"
                    fullWidth
                    autoComplete="appearance-score"
                    sx={{marginBottom: 3, marginTop: 3}}
                    value={form.appearanceScore}
                    onChange={handleChange}
                />

                <TextField
                    id="service-score"
                    type="text"
                    variant="outlined"
                    label="service score"
                    name="serviceScore"
                    fullWidth
                    autoComplete="service-score"
                    sx={{marginBottom: 3}}
                    value={form.serviceScore}
                    onChange={handleChange}
                />*/}

                <Stack spacing={1} sx={{ marginBottom: 3 }}>
                    <Typography gutterBottom sx={{ textAlign: 'start' }}>Food Score</Typography>
                    <Slider
                        id="food-score"
                        name="foodScore"
                        valueLabelDisplay="auto"
                        value={form.foodScore}
                        onChange={handleSliderChange('foodScore')}
                        min={0}
                        max={10}
                    />
                </Stack>

                <Stack spacing={1} sx={{ marginBottom: 3 }}>
                    <Typography gutterBottom sx={{ textAlign: 'start' }}>Appearance Score</Typography>
                    <Slider
                        id="appearance-score"
                        name="appearanceScore"
                        valueLabelDisplay="auto"
                        value={form.appearanceScore}
                        onChange={handleSliderChange('appearanceScore')}
                        min={0}
                        max={10}
                    />
                </Stack>

                <Stack spacing={1} sx={{ marginBottom: 3 }}>
                    <Typography gutterBottom sx={{ textAlign: 'start' }}>Service Score</Typography>
                    <Slider
                        id="service-score"
                        name="serviceScore"
                        valueLabelDisplay="auto"
                        value={form.serviceScore}
                        onChange={handleSliderChange('serviceScore')}
                        min={0}
                        max={10}
                    />
                </Stack>

                <TextField
                    id="comments"
                    type="text"
                    variant="outlined"
                    label="comments"
                    name="comments"
                    multiline
                    maxRows={10}
                    fullWidth
                    autoComplete="comments"
                    sx={{marginBottom: 3}}
                    value={form.comments}
                    onChange={handleChange}
                />

                <TextField
                    id="image"
                    type="text"
                    variant="outlined"
                    label="image"
                    name="image"
                    fullWidth
                    autoComplete="image"
                    sx={{marginBottom: 3}}
                    value={form.image}
                    onChange={handleChange}
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
}
;

