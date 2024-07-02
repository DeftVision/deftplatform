import { Button, Box, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const form_default = {
    email: "",
    password: "",
}



const Login = () => {
    return (
        <>
         <Box>
             <Typography>Login</Typography>
             <form noValidate>
                 <TextField
                     type="email"
                     variant="outlined"
                     id="email"
                     name="email"
                     autoComplete="email"
                     fullWidth
                     label="Email"
                     sx={{marginBottom: 3, marginTop: 3 }}
                 />

                 <TextField
                     type="password"
                     variant="outlined"
                     id="password"
                     name="password"
                     autoComplete="password"
                     fullWidth
                     label="Password"
                     sx={{marginBottom: 3}}
                 />
                 <Button
                     id="submit-button"
                     variant="outlined"
                     type="submit"
                 >
                     SAVE
                 </Button>
             </form>
         </Box>
        </>
    );
};

export default Login;