const express = require('express');
const router = express.Router();

const {getAnnouncements, getAnnouncement, newAnnouncement, updateAnnouncement, deleteAnnouncement} = require("../controllers/announcementController");


router.get('/announcements/', getAnnouncements);
router.get('/announcement/:id', getAnnouncement);
router.post('/new', newAnnouncement);
router.patch('/update/:id', updateAnnouncement);
router.delete('/delete/:id', deleteAnnouncement);

module.exports = router;


