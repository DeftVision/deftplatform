import { Button, Box, TextField, Typography } from '@mui/material';
import {useContext, useState} from 'react';
import cookies from 'js-cookie';
import UserContext from '../components/UserContext'
import { useNotification} from "../components/NotificationContext";


const form_default = {
    email: "",
    password: "",
}



export default function() {
    const [form, setForm] = useState(form_default);
    const showNotification = useNotification();
    const {setUser} = useContext(UserContext);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:7000/api/user/login`,{
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                "Content-Type": "application/json",
            }
        });

        const _response = await response.json();
        if(response.ok && _response.user) {
            const userId = _response.user._id;
            cookies.set("userCookie", userId);
            setUser(_response.user);
            showNotification(_response.message);
        } else {
            showNotification(_response.message, 'error');
        }
    }
    return (
        <>
         <Box>
             <Typography>Login</Typography>
             <form onSubmit={handleSubmit} noValidate>
                 <TextField
                     type="email"
                     variant="outlined"
                     id="email"
                     name="email"
                     autoComplete="email"
                     fullWidth
                     label="Email"
                     sx={{marginBottom: 3, marginTop: 3 }}
                     onChange={(e)=>{
                         setForm({
                             ...form,
                             email: e.target.value,
                         })
                     }}
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
                     onChange={(e)=>{
                         setForm({
                             ...form,
                             password: e.target.value,
                         })
                     }}
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
