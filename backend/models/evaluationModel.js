const mongoose = require('mongoose');
const schema = mongoose.Schema;

const evaluationSchema = new schema({
    visitDateTime: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    evaluator: {
        type: String,
        required: true,
    },
    cashier: {
        type: String,
        required: true,
    },
    greeting: {
        type: Boolean,
        required: false,
    },
    repeatOrder: {
        type: Boolean,
        required: false,
    },
    upsell: {
        type: Boolean,
        required: false,
    },
    patio: {
        type: Boolean,
        required: false,
    },
    wait: {
        type: Number,
        required: false,
    },
    foodScore: {
        type: Number,
        required: false,
    },
    appearanceScore: {
        type: Number,
        required: false,
    },
    serviceScore: {
        type: Number,
        required: false,
    },
    identifyManager: {
        type: Boolean,
        required: false,
    },
    downloadUrl: {
        type: String,
        required: true,
    },
    uniqueFileName: {
        type: String,
        required: true,
    },
    comments: {
        type: String,
        required: true,
    },

}, {timestamps: true});

const evaluationModel = mongoose.model("Evaluation", evaluationSchema);
module.exports = evaluationModel;