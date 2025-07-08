

const router = require('express').Router()
const {getNotification,addNotification} = require('../../controllers/admin/AdminNotification');
const {isAuthenticated } = require('../../middlewares')



// Notification 
router.post('/getNotification',isAuthenticated,getNotification);
router.post('/addNotification',isAuthenticated,addNotification);



module.exports = router

