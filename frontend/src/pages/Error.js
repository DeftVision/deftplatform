import {Box, Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


export default function Error () {
    return (
        <Box>
            <Typography>404: Page not found</Typography>
        </Box>
    );
};

