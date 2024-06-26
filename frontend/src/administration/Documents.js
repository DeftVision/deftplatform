import {Box, Button, Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


export default function Documents () {
    return (
        <Box>
            <Typography>Documents</Typography>
            <Button component={Link} to='/document-form'>Add Document</Button>
        </Box>
    );
};

