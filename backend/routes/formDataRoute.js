const express = require('express');
const router = express.Router();

const {newForm} = '../controllers/formDataController';

router.post('/submit-form', newForm)


module.exports = router;