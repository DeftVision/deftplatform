const mongoose = require('mongoose');
const schema = mongoose.Schema;

const documentSchema = new schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    downloadUrl: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const documentModel = mongoose.model("Document", documentSchema);
module.exports = documentModel;