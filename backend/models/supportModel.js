const mongoose = require("mongoose");
const schema = mongoose.Schema;

const supportSchema = new schema({
    ticketId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    urgency: {
        type: String,
        required: true,
    },
    ticketStatus: {
        type: String,
        required: true,
    },
    archive: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});


const supportModel = mongoose.model("support", supportSchema);
module.exports = supportModel;

