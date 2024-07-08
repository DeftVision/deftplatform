const mongoose = require('mongoose');
const schema = mongoose.Schema;

const formSchema = new schema ({
    name: String,
    age: Number,
    archive: Boolean,
})


const formModel = mongoose.model("Form", formSchema);
module.exports = formModel;