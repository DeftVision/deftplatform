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
        required: true,
    },
    foodScore: {
        type: Number,
        required: true,
    },
    appearanceScore: {
        type: Number,
        required: true,
    },
    serviceScore: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    identifyManager: {
        type: Boolean,
        required: false,
    },
    comments: {
        type: String,
        required: true,
    },

}, {timestamps: true});

const evaluationModel = mongoose.model("Evaluation", evaluationSchema);
module.exports = evaluationModel;