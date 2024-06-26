import {Routes, Route} from 'react-router-dom';
import {Box, Container} from "@mui/material";

import {Administration, Announcements, ServiceTickets, Users, Documents, Evaluations} from './administration/index'
import {AnnouncementForm} from "./announcements/index";
// import {   } from './authentication/index'
import {Navigation} from './components/index'
import {DocumentForm} from './documents/index'
import {EvaluationForm} from './evaluations/index'
import {Help, Home, Settings} from './pages/index'
import Error from './pages/Error'
import {UserForm} from './users/index'


function App() {
    return (
        <>
            <Navigation sx={{display: 'flex'}} />
            <Container sx={{marginTop: 5}}>
                <Box>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/admin" element={<Administration/>}/>
                            <Route path="/documents" element={<Documents/>}/>
                            <Route path="/document-form" element={<DocumentForm/>}/>
                            <Route path="/announcements" element={<Announcements/>}/>
                            <Route path="/evaluations" element={<Evaluations/>}/>
                            <Route path="/help" element={<Help/>}/>
                            <Route path="/users" element={<Users/>}/>
                            <Route path="/settings" element={<Settings/>}/>
                            <Route path="*" element={<Error/>}/>
                        </Routes>
                    </div>
                </Box>
            </Container>
        </>
    );
}

export default App;
