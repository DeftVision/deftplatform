import {
    Box,
    Button,
    Table,
    TableBody,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    Paper,
    IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useNotification} from "../components/NotificationContext";


export default function Users () {
    const [users, setUsers] = useState([])
    const showNotification = useNotification();

    async function getUsers () {
        try {
            const response = await fetch(`http://localhost:7000/api/user/users`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const _response = await response.json();

            if(response.ok && _response.users) {
                setUsers(_response.users);
            } else {
                console.log(_response.error);
                showNotification(_response.error, 'error');
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    async function deleteUser(userId) {
        try {
            const response = await fetch(`http://localhost:7000/api/user/delete/${userId}`, {
                method: 'DELETE'
            });

            if(response.ok) {
                setUsers(users.filter(user => user._id !== userId));
                showNotification('User deleted successfully', 'success')
            }
        }
        catch (error) {
            console.error(error);
            showNotification('Error deleting user', 'error');
        }
    }

    return (
        <>
            <Box sx={{ display: 'flex', marginBottom: 4, textAlign: 'center' }}>
                <Button component={Link} to="/user-form">Add New</Button>
            </Box>

            <Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.location}</TableCell>
                                    <TableCell>
                                        <IconButton component={Link} to={`/edit-user/${user._id}`}>
                                            <Edit sx={{ color: 'dodgerblue' }} />
                                        </IconButton>
                                        <IconButton onClick={() => deleteUser(user._id)}>
                                            <Delete sx={{ color: 'dimgray' }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};


