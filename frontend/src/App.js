import './App.css';
import { Box, Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from 'react-router-dom';
import { Administration } from './administration/index';
import { Login } from './authentication/index'
import { NavDrawer, UserContext, PrivateRoutes } from './components/index';
import { Dashboard, DashboardData } from './dashboard/index';
import { Documents, DocumentForm } from './documents/index';
import { Evaluations, EvaluationForm } from './evaluations/index';
import { Announcements, AnnouncementForm } from './announcements/index';
import { Home, Settings } from './pages/index';
import { Tickets, TicketForm } from './support/index';
import { Users, UserForm } from './users/index';
import Error from './pages/Error';
import { useEffect, useState } from "react";

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
    typography: {
        fontWeightBold: 700, // Define fontWeightBold
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        fontWeightBold: 700, // Define fontWeightBold
    },
});

function App() {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <CssBaseline />
            <NavDrawer toggleTheme={toggleTheme} theme={theme} />
            <Container sx={{ marginTop: 15 }}>
                <Box>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/admin" element={<Administration />} />

                            <Route path="/dashboard" element={<Dashboard />} />

                            <Route path="/documents" element={<Documents />} />
                            <Route path="/document-form" element={<DocumentForm newDocument />} />
                            <Route path="/edit-document/:id" element={<DocumentForm />} />

                            <Route path="/announcements" element={<Announcements />} />
                            <Route path="/announcement-form" element={<AnnouncementForm newAnnouncement/>} />
                            <Route path="/edit-announcement/:id" element={<AnnouncementForm />} />

                            <Route path="/evaluations" element={<Evaluations />} />
                            <Route path="/evaluation-form" element={<EvaluationForm newEvaluation />} />
                            <Route path="/edit-evaluation/:id" element={<EvaluationForm />} />

                            <Route path="/administration" element={<Administration />} />

                            <Route path="/tickets" element={<Tickets />} />
                            <Route path="/ticket-form" element={<TicketForm newTicket/>} />
                            <Route path="/edit-ticket/:id" element={<TicketForm />} />

                            <Route path="/users" element={<Users />} />
                            <Route path="/user-form" element={<UserForm newUser/>} />
                            <Route path="/edit-user/:id" element={<UserForm />} />

                            <Route path="/login" element={<Login />} />

                            <Route path="/settings" element={<Settings />} />
                            <Route path="*" element={<Error />} />
                        </Routes>
                    </div>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default App;
