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
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { useNotification } from '../components/NotificationContext';

export default function Documents() {
    const [documents, setDocuments] = useState([]);
    const showNotification = useNotification();

    async function getDocuments() {
        try {
            const response = await fetch(`http://localhost:7000/api/docs/documents`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const _response = await response.json();
            if (response.ok && _response.documents) {
                setDocuments(_response.documents);
            } else {
                console.error(_response.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDocuments();
    }, []);

    async function deleteDocument(documentId, uniqueFileName) {
        try {
            if (uniqueFileName) {
                const storage = getStorage();
                const fileRef = ref(storage, `uploads/${uniqueFileName}`);
                await deleteObject(fileRef);
            } else {
                console.error('unique file name is not defined');
                return;
            }

            // Delete the document record from the database
            const response = await fetch(`http://localhost:7000/api/docs/delete/${documentId}`, {
                method: 'DELETE',
            });

            const _response = await response.json();
            if (response.ok) {
                setDocuments(documents.filter(document => document._id !== documentId));
                showNotification(_response.message, 'success');
            } else {
                console.error(_response.error);
                showNotification(_response.message, 'error');
            }
        } catch (error) {
            showNotification('Error deleting document', 'error');
        }
    }

    return (
        <>
            <Typography>Documents</Typography>
            <Box sx={{ display: 'flex', marginBottom: 4, textAlign: 'center' }}>
                <Button component={Link} to="/document-form">Add New</Button>
            </Box>

            <Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {documents.map((document) => (
                                <TableRow key={document._id}>
                                    <TableCell>{document.title}</TableCell>
                                    <TableCell>{document.category}</TableCell>
                                    <TableCell>
                                        <IconButton component={Link} to={`/edit-document/${document._id}`}>
                                            <Edit sx={{ color: 'dodgerblue' }} />
                                        </IconButton>
                                        <IconButton onClick={() => deleteDocument(document._id, document.uniqueFileName)}>
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
}
