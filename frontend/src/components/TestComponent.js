import React from 'react';
import GenericFormStructure from './GenericFormStructure';
import {TextField} from "@mui/material";

const form_fields = [
    {type:'text', required:true, title:'Name of User', name:'name' },
    {type:'number', required:true, title:'Age of User', name:'age' },
    {type:'checkbox', required:false, title:'archived', name:'archived' },

]


export default function TestComponent () {
    return (
        <div>
            <GenericFormStructure form_fields={form_fields} />
        </div>
    );
};

