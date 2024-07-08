import React from 'react';
import GenericFormStructure from './GenericFormStructure';
import {TextField} from "@mui/material";
import { Box } from "@mui/material";
import {useNotification} from "./NotificationContext";

const form_fields = [
    {type:'text', required:true, title:'Name of User', name:'name' },
    {type:'slider', required:true, title:'Age of User', name:'age' },
    {type:'switch', required:false, title:'archived', name:'archived' },

]


export default function TestComponent () {
    return (
        <Box sx={{p:3}}>
            <GenericFormStructure form_fields={form_fields} />
        </Box>
    );
};

