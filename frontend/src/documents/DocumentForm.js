import { Box, Button, styled, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useState, useEffect } from 'react';

const form_default = {
    documentName: "",
    documentCategory: "",
    downloadUrl: "",
    uploadFileName: ""
}

export default function DocumentForm () {
    const [form, setForm] = useState(form_default);
    const [uploadProgress, setUploadProgress] = useState(0);
    const {id} = useParams();

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

    return (
        <Box>
            <form>
                <Box>
                    <TextField
                        id="document-name"
                        type="text"
                        variant="outlined"
                        label="Name"
                        fullWidth
                        autoComplete="document name"
                        sx={{marginBottom: 3}}
                        value={form.documentName}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                documentName: e.target.value
                            })
                        }}
                    />
                    <TextField
                        id="document-category"
                        type="text"
                        variant="outlined"
                        label="Category"
                        fullWidth
                        autoComplete="document category"
                        sx={{marginBottom: 3}}
                        value={form.documentCategory}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                documentCategory: e.target.value
                            })
                        }}
                    />
                    <Box>
                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<CloudUploadIcon/>}
                        >
                            UPLOAD
                            <VisuallyHiddenInput
                                type="file"

                            />
                        </Button>
                        {/*<Typography sx={{marginLeft: 2}}>
                        </Typography>*/}
                    </Box>
                </Box>
                <Button
                    id="save-button"
                    variant="outlined"
                    sx={{marginTop: 3}}
                >
                    Save
                </Button>
            </form>
        </Box>
    );
};

