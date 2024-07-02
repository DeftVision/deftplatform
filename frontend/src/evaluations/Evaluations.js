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
    IconButton, Typography
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNotification } from '../components/NotificationContext';
import { getStorage, ref, deleteObject } from 'firebase/storage';

export default function Evaluations () {
    const [evaluations, setEvaluations] = useState([]);
    const showNotification = useNotification();

    async function getEvaluations () {
        try {
            const response = await fetch(`http://localhost:7000/api/eval/evaluations`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const _response = await response.json();

            if(response.ok && _response.evaluations) {
                setEvaluations(_response.evaluations);
            } else {
                console.log(_response.error);
                showNotification(_response.error, 'error');
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getEvaluations();
    }, []);

    async function deleteEvaluation(evaluationId, uniqueFileName) {
        try {
            // Delete file from Firebase storage
            if (uniqueFileName) {
                const storage = getStorage();
                const fileRef = ref(storage, `uploads/${uniqueFileName}`);
                try {
                    await deleteObject(fileRef);
                } catch (error) {
                    console.log(error);

                }
            }

            // Delete evaluation record from backend
            const response = await fetch(`http://localhost:7000/api/eval/delete/${evaluationId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const _response = await response.json();
            if(response.ok) {
                setEvaluations(evaluations.filter(evaluation => evaluation._id !== evaluationId));
                showNotification(_response.message, 'success');
            } else {
                showNotification(_response.error, 'error');
            }
        }
        catch (error) {
            showNotification('Error deleting evaluation or file', 'error');
        }
    }

    return (
        <>
            <Typography>Evaluation</Typography>
            <Box sx={{ display: 'flex', marginBottom: 4, textAlign: 'center' }}>
                <Button component={Link} to="/evaluation-form">Add New</Button>
            </Box>

            <Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {evaluations.map((evaluation) => (
                                <TableRow key={evaluation._id}>
                                    <TableCell>{evaluation.visitDateTime}</TableCell>
                                    <TableCell>{evaluation.location}</TableCell>
                                    <TableCell>
                                        <IconButton component={Link} to={`/edit-evaluation/${evaluation._id}`}>
                                            <Edit sx={{ color: 'dodgerblue' }} />
                                        </IconButton>
                                        <IconButton onClick={() => deleteEvaluation(evaluation._id, evaluation.uniqueFileName)}>
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
