require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 7001;
const connectDB = require('./config/db');
connectDB ();

const documentRoutes = require('./routes/documentRoute');
const announcementRoutes = require('./routes/announcementRoute');
const evaluationRoutes = require('./routes/evaluationRoute');


const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/docs', documentRoutes);
app.use('/api/announce', announcementRoutes);
app.use('/api/eval', evaluationRoutes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})