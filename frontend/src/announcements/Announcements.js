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
    IconButton,
    Typography
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNotification } from '../components/NotificationContext';



export default function Announcements () {
    const [announcements, setAnnouncements] = useState([])
    const showNotification = useNotification();

    async function getAnnouncements () {
        try {
            const response = await fetch(`http://localhost:7000/api/announce/announcements`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const _response = await response.json();

            if(response.ok && _response.announcements) {
                setAnnouncements(_response.announcements);

            } else {
                console.log(_response.error);
                showNotification(_response.error, 'error');
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAnnouncements();
    }, []);

    async function deleteAnnouncement(announcementId) {
        try {
            const response = await fetch(`http://localhost:7000/api/announce/delete/${announcementId}`, {
                method: 'DELETE'
            });

            const _response = await response.json();

            if(response.ok) {
                setAnnouncements(announcements.filter(announcement => announcement._id !== announcementId));
                showNotification(_response.message, 'success');
            } else {
                showNotification(_response.error, 'error');
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Typography>Announcements</Typography>
            <Box sx={{ display: 'flex', marginBottom: 4, textAlign: 'center' }}>
                <Button component={Link} to="/announcement-form">Add New</Button>
            </Box>

            <Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Subject</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {announcements.map((announcement) => (
                                <TableRow key={announcement._id}>
                                    <TableCell>{announcement.title}</TableCell>
                                    <TableCell>{announcement.subject}</TableCell>
                                    <TableCell>
                                        <IconButton component={Link} to={`/edit-announcement/${announcement._id}`}>
                                            <Edit sx={{ color: 'dodgerblue' }} />
                                        </IconButton>
                                        <IconButton onClick={() => deleteAnnouncement(announcement._id)}>
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

