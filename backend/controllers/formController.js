const formModel = require('../models/formDataModel');

exports.newForm = async (req, res) => {
    try{
        const { name, archive, age } = req.body;
        const formData = new formModel({name, archive, age});
        await formData.save();
        return res.send({
            message: "form data saved",
            formData,
        })
    }
    catch (error) {
        console.log(error);
        return res.send({
            message: "Error saving form",
            error: error,
        })
    }
}
