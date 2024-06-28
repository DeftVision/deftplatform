const announcementModel = require('../models/announcementModel');

exports.getAnnouncements = async (req, res) => {
    try {
        const announcements = await announcementModel.find({});
        if(!announcements) {
            return res.send({
                message: 'No announcements found'
            })
        }
        if(announcements) {
            return res.send({
                announcement_count: announcements.length,
                announcements,
            })
        }
    }
    catch (error) {
        console.log(error);
        return res.send({
            message: 'Error getting all announcements',
            error,
        })
    }
}

exports.getAnnouncement = async (req, res) => {
    try {
        const {id} = req.params;
        const announcement = await announcementModel.findById(id);
        if(!announcement) {
            return res.send({
                message: 'Announcement not found',
            })
        }
        if(announcement) {
            return res.send({
                announcement,
            })
        }
    }
    catch (error) {
        console.log(error);
        return res.send({
            message: 'Error getting announcement',
            error,
        })
    }
}

exports.newAnnouncement = async (req, res) => {
    try {
        const {title, subject, content, display, priority, role} = req.body;

        if(!title || !subject || !content || !priority || !role) {
            return res.send({
                message: 'All fields are required',
            })
        }
        const announcement = new announcementModel({title, subject, content, display, priority, role});
        await announcement.save();
        return res.send({
            message: 'Announcement was saved successfully',
            announcement,
        })
    }
    catch (error) {
        console.log(error);
        return res.send({
            message: 'Error saving an announcement',
            error,
        })
    }
}

exports.updateAnnouncement = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, subject, content, display, priority, role} = req.body;
        const announcement = await announcementModel.findByIdAndUpdate(id, req.body, {new: true});
        if (!announcement) {
            return res.send({
                message: "Announcement wasn't saved",
            })
        } else {
            return res.send({
                message: 'Announcement was saved successfully',
                announcement,
            })
        }
    }
    catch (error) {
        console.log(error);
        return res.send({
            message: 'Error updating an announcement',
            error,
        })
    }
}

exports.deleteAnnouncement = async (req, res) => {
    try {
        const {id} = req.params;
        const announcement = await announcementModel.findByIdAndDelete(id);
        if(announcement) {
            return res.send({
                message: 'Announcement was deleted successfully',
            })
        } else {
            return res.send({
                message: 'Deleting announcement failed',
            })
        }
    }
    catch (error) {
        console.log(error);
        return res.send({
            message: 'Error deleting an announcement',
            error,
        })
    }
}