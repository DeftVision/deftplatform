const formDataModel = require('../models/formDataModel');

exports.newForm = async (req, res) => {
    try{
        const { name, archive, age } = req.body;
        const formData = new formDataModel({name, archive, age});
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

exports.getForms = async (req, res) => {
    try {
        const formData = await formDataModel.find({});
        if(!formData) {
            return res.send({
                message: "Forms not found"
            })
        }
        if(formData) {
            return res.send({
                formCount: formData.length,
                formData,

            })
        }
    }
    catch (error) {
        console.log(error);
        return res.send({
            message: "Error saving form",
            error: error,
        })
    }
}
