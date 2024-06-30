const express = require('express');
const router = express.Router();

const {getUsers, getUser, newUser, updateUser, deleteUser} = require ('../controllers/userController')

router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.post('/new', newUser)
router.patch('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

module.exports = router;