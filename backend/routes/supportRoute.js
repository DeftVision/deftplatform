const express = require('express');
const router = express.Router();

const {getTicket, getTickets, newTicket, updateTicket, deleteTicket} = require('../controllers/supportController');

router.get('/tickets', getTickets);
router.get('/ticket/:id', getTicket);
router.post('/new', newTicket);
router.patch('/update/:id', updateTicket);
router.delete('/delete/:id', deleteTicket);


module.exports = router;