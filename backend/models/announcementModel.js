const mongoose = require('mongoose')
const schema = mongoose.Schema;

const announcementSchema = new schema({
    title: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    publish: {
        type: Boolean,
    },
    priority: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },

}, {timestamps: true});

const announcementModel = mongoose.model('Announcement', announcementSchema)
module.exports = announcementModel


