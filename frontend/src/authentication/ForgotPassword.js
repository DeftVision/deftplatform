import {Link} from 'react-router-dom';
import {Box, Button, Typography} from "@mui/material";

const ForgotPassword = () => {
    return (
        <Box>
            <Typography variant="body2" color="textSecondary">Forgot Password? connect to firebase authentication</Typography>
            <Button variant="outlined" component={Link} to='/login' sx={{marginTop: 3}}>Back to Login</Button>
        </Box>
    );
};

export default ForgotPassword;