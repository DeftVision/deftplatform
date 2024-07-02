import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    Slider,
    Stack,
    styled,
    Switch,
    TextField,
    Typography
} from '@mui/material';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useNotification} from '../components/NotificationContext';
import {deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {v4 as uuidv4} from 'uuid';

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
    identifyManager: false,
    comments: ""
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function EvaluationForm({newEvaluation}) {
    const [form, setForm] = useState(form_default);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState('default');
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);
    const showNotification = useNotification();
    const {id} = useParams()


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
                        ...form,
                        ...evaluation
                    })
                } else {
                    showNotification(_response.error, 'error');
                }
            } catch (error) {
                showNotification('Error occurred while fetching evaluation', 'error');
            }
        }

        if (!newEvaluation) {
            editEvaluation();
        }
    }, [id]);

    const validateFields = () => {
        const requiredFields = ['visitDateTime', 'location', 'evaluator', 'cashier', 'wait', 'comments']
        for (let field of requiredFields) {
            if (!form[field]) {
                return false;
            }
        }
        return true;
    }

    const handleChange = (e, newValue) => {
        const {name, value, type, checked} = e.target;
        if (name) {
            setForm({
                ...form,
                [name]: type === 'checkbox' ? checked : value,
            })
        }
        if (typeof newValue === 'number') {
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

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFileName(selectedFile.name);
            setFile(selectedFile);
        }
    }

    const deleteExistingFile = async (filePath) => {
        const storage = getStorage();
        const fileRef = ref(storage, filePath);
        try {
            await deleteObject(fileRef);
            console.log(`File ${filePath} deleted successfully`);
        } catch (error) {
            console.log('Failed to delete document', error);
        }
    }

    const uploadFileToFirebase = async () => {
        if (file) {
            const uniqueFileName = `${uuidv4()}-${file.name}`
            const storage = getStorage();
            const storageRef = ref(storage, `uploads/${uniqueFileName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            setUploading('uploading');

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error('upload failed', error);
                    setUploading('error');
                    showNotification('Upload failed', error);
                },
                async () => {
                    try {
                        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                        setForm((prevForm) => ({
                            ...prevForm,
                            downloadUrl,
                            uniqueFileName,
                        }));
                        setUploading('success');
                        showNotification('Upload successfully', 'success');
                    } catch (error) {
                        setUploading('error');
                        showNotification('Failed to get download URL', 'error');
                    }
                }
            );
        } else {
            throw new Error('No file selected');
        }
    };

    const saveToDb = async () => {

        let url = 'http://localhost:7000/api/eval/new/';
        let method = 'POST';

        if (!newEvaluation) {
            url = `http://localhost:7000/api/eval/update/${id}`;
            method = 'PATCH';
        }

        try {
            const response = await fetch(url, {
                method: method,
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const _response = await response.json();
            if (!response.ok) {
                showNotification(_response.message || 'Error saving form', 'error')
            } else {
                showNotification(_response.message, 'success');
            }

        } catch (error) {
            showNotification('Error saving form', 'error');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateFields()) {
            showNotification('Missing required fields', 'error');
            return;
        }

        try {
            if (file) {
                if (!newEvaluation && form.uniqueFileName) {
                    await deleteExistingFile(`uploads/${form.uniqueFileName}`);
                }
                await uploadFileToFirebase();
            } else {
                await saveToDb();
            }
        } catch (error) {
            showNotification('Failed to upload file or save evaluation', 'error');
        }
    };

    useEffect(() => {
        if (uploading === 'success') {
            saveToDb();
        }
    }, [uploading])


    return (
        <>
            <Box>
                <Typography>Evaluation Form</Typography>
            </Box>
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
                        multiline
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
                        type="number"
                        variant="outlined"
                        label="wait [in minutes]"
                        name="wait"
                        fullWidth
                        autoComplete="wait-food"
                        sx={{marginBottom: 3}}
                        value={form.wait}
                        onChange={handleChange}
                        inputProps={{min: 0, max: 120}}
                    />

                    <Stack spacing={1} sx={{marginBottom: 3}}>
                        <Typography gutterBottom sx={{textAlign: 'start'}}>Food Score:</Typography>
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

                    <Stack spacing={1} sx={{marginBottom: 3}}>
                        <Typography gutterBottom sx={{textAlign: 'start'}}>Appearance Score</Typography>
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

                    <Stack spacing={1} sx={{marginBottom: 3}}>
                        <Typography gutterBottom sx={{textAlign: 'start'}}>Service Score</Typography>
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
                        rows={4}
                        fullWidth
                        autoComplete="comments"
                        sx={{marginBottom: 3}}
                        value={form.comments}
                        onChange={handleChange}
                    />
                    <Stack direction="row" spacing={2}
                           sx={{marginBottom: 5, justifyContent: 'center', alignItems: 'center'}}>
                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<CloudUploadIcon/>}
                        >
                            UPLOAD
                            <VisuallyHiddenInput
                                type="file"
                                onChange={handleFileChange}
                            />
                        </Button>
                        <Typography sx={{marginLeft: 2}}>
                            {fileName}
                        </Typography>
                    </Stack>
                    {uploading === "uploading" && (
                        <Box sx={{width: '100%', marginBottom: 3}}>
                            <LinearProgress variant='determinate' value={uploadProgress}/>
                        </Box>
                    )}
                    <Box>
                        <Button
                            id="submit-button"
                            variant="outlined"
                            type="submit"
                            sx={{marginBottom: 5}}
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

