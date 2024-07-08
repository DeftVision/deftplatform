import './App.css';
import cookies from 'js-cookie';
import {Box, Container, CssBaseline, Toolbar} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import {Navigate, Route, Routes} from 'react-router-dom';
import {Administration} from './administration/index';
import {Login, ForgotPassword} from './authentication/index'
import {NavDrawer, PrivateRoutes, UserContext} from './components/index';
import {Dashboard} from './dashboard/index';
import {DocumentForm, Documents} from './documents/index';
import {EvaluationForm, Evaluations} from './evaluations/index';
import {AnnouncementForm, Announcements} from './announcements/index';
import TestComponent from './components/TestComponent';
import {Home, Settings} from './pages/index';
import {TicketForm, Tickets} from './support/index';
import {UserForm, Users} from './users/index';
import Error from './pages/Error';
import {useEffect, useState} from "react";
import {useNotification} from "./components/NotificationContext";
import { lightTheme, darkTheme } from "./components/theme";


function App() {
    const [theme, setTheme] = useState('light');
    const [user, setUser] = useState(null);
    const userCookie = cookies.get('userCookie');
    const showNotification = useNotification();

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

/*
    **  CAUSES LIGHT AND DARK MODE FLICKERING IF ENABLED  **
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
    }, [theme]);
*/

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        async function getUser() {
            const response = await fetch(`http://localhost:7000/api/user/user/${userCookie}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const _response = await response.json();
            if(response.ok) {
                showNotification(_response.message, 'success');
            } else {
                showNotification(_response.error, 'error');
            }

        }
        if(userCookie) {
            getUser();
        }
    }, []);

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <CssBaseline/>
            <UserContext.Provider value={{user, setUser}}>

                <NavDrawer toggleTheme={toggleTheme} theme={theme}/>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Toolbar />
                <Container sx={{ flexGrow: 1 }}>
                    <Box>
                        <div className="App">
                            <Routes>
                                <Route element={<PrivateRoutes />}>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/admin" element={<Administration/>}/>

                                <Route path="/dashboard" element={<Dashboard/>}/>

                                <Route path="/documents" element={<Documents/>}/>
                                <Route path="/document-form" element={<DocumentForm newDocument/>}/>
                                <Route path="/edit-document/:id" element={<DocumentForm/>}/>

                                <Route path="/announcements" element={<Announcements/>}/>
                                <Route path="/announcement-form" element={<AnnouncementForm newAnnouncement/>}/>
                                <Route path="/edit-announcement/:id" element={<AnnouncementForm/>}/>

                                <Route path="/evaluations" element={<Evaluations/>}/>
                                <Route path="/evaluation-form" element={<EvaluationForm newEvaluation/>}/>
                                <Route path="/edit-evaluation/:id" element={<EvaluationForm/>}/>

                                <Route path="/administration" element={<Administration/>}/>

                                <Route path="/tickets" element={<Tickets/>}/>
                                <Route path="/ticket-form" element={<TicketForm newTicket/>}/>
                                <Route path="/edit-ticket/:id" element={<TicketForm/>}/>

                                <Route path="/users" element={<Users/>}/>
                                <Route path="/user-form" element={<UserForm newUser/>}/>
                                <Route path="/edit-user/:id" element={<UserForm/>}/>

                                <Route path="/settings" element={<Settings/>}/>
                                </Route>
                                <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>}/>
                                <Route path="test-component" element={<TestComponent/>}/>
                                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                                <Route path="*" element={<Error/>}/>
                            </Routes>
                        </div>
                    </Box>
                </Container>
                </Box>
            </UserContext.Provider>
        </ThemeProvider>
    )
}

export default App;
