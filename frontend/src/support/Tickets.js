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


export default function Tickets () {
    const [tickets, setTickets] = useState([])

    async function getTickets () {
        try {
            const response = await fetch(`http://localhost:7000/api/support/tickets`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const _response = await response.json();

            if(response.ok && _response.tickets) {
                setTickets(_response.tickets);
            } else {
                console.log(_response.error);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getTickets();
    }, []);

    async function deleteTicket(ticketId) {
        try {
            const response = await fetch(`http://localhost:7000/api/support/delete/${ticketId}`, {
                method: 'DELETE'
            });

            if(response.ok) {
                setTickets(tickets.filter(ticket => ticket._id !== ticketId));
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Box sx={{ display: 'flex', marginBottom: 4, textAlign: 'center' }}>
                <Button component={Link} to="/ticket-form">Add New</Button>
            </Box>

            <Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Urgency</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tickets.map((ticket) => (
                                <TableRow key={ticket._id}>
                                    <TableCell>{ticket.title}</TableCell>
                                    <TableCell>{ticket.ticketStatus}</TableCell>
                                    <TableCell>{ticket.urgency}</TableCell>
                                    <TableCell>
                                        <IconButton component={Link} to={`/edit-ticket/${ticket._id}`}>
                                            <Edit sx={{ color: 'dodgerblue' }} />
                                        </IconButton>
                                        <IconButton onClick={() => deleteTicket(ticket._id)}>
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

