const express = require('express');
const router = express.Router();

const {getForms, newForm} = require ('../controllers/formController');

router.get('/forms', getForms)
router.post('/new', newForm)

module.exports = router;