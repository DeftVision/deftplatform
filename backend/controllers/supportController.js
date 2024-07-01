const supportModel = require('../models/supportModel');

//
//

exports.getTickets = async (req, res) => {
    try {
        const tickets = await supportModel.find({});
        if(!tickets) {
            return res.send({
                message: "Tickets not found",
            })
        }
        if(tickets) {
            return res.send({
                ticket_count: tickets.length,
                tickets
            })
        }
    } catch (error) {
        console.log(error);
        return res.send({
            message: "Error getting all tickets",
            error: error,
        })
    }
}

exports.getTicket = async (req, res) => {
    try {
        const {id} = req.params;
        const ticket = await supportModel.findById(id);
        if(!ticket) {
            return res.send({
                message: "Ticket not found",
            })
        } else {
            return res.send({
                ticket,
            })
        }
    } catch (error) {
        console.log(error);
        return res.send({
            message: "Error getting ticket",
            error: error,
        })
    }
}

exports.newTicket = async (req, res) => {
    try {
        const {ticketId, title, description, location, email, urgency, ticketStatus, archive} = req.body;
        if(!ticketId || !title || !description || !location || !email || !urgency || !ticketStatus) {
            return res.send({
                message: "All fields are required"
            })
        }
        const ticket = new supportModel({ticketId, title, description, location, email, urgency, ticketStatus, archive});
        await ticket.save();
        return res.send({
            message: "Ticket created",
            ticket,
        })

    } catch (error) {
        console.log(error);
    }
}

exports.updateTicket = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, description, location, email, urgency, ticketStatus, archive} = req.body;
        const ticket = await supportModel.findByIdAndUpdate(id, req.body, {new: true});
        if (!ticket) {
            return res.send({
                message: "Ticket not found",
            })
        } else {
            return res.send({
                message: "Ticket updated successfully",
            })
        }
    } catch (error) {
        console.log(error);
        return res.send({
            message: "Error updating ticket",
            error: error,
        })
    }
}

exports.deleteTicket = async (req, res) => {
    try {
        const {id} = req.params;
        const ticket = await supportModel.findByIdAndDelete(id);
        if(!ticket) {
            return res.send({
                message: "Ticket not found",
            })
        } else {
            return res.send({
                message: "Ticket deleted successfully"
            })
        }
    } catch (error) {
        console.log(error);
        return res.send({
            message: "Error deleting ticket",
            error: error,
        })
    }
}

