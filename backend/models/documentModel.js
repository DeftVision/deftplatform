const mongoose = require('mongoose');
const schema = mongoose.Schema;

const documentSchema = new schema({
    documentName: {
        type: String,
        required: true,
    },
    documentCategory: {
        type: String,
        required: true,
    },
    downloadUrl: {
        type: String,
        required: true,
    },
    uploadFileName: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const documentModel = mongoose.model("Document", documentSchema);
module.exports = documentModel;