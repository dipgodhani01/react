const router = require('express').Router()
const { getAllbookings,getAllQuickbookings } = require('../../controllers/admin/booking');
const {isAuthenticated } = require('../../middlewares')


router.post('/getAllbookings', isAuthenticated,getAllbookings);
router.post('/getAllQuickbookings', isAuthenticated,getAllQuickbookings);



module.exports = router;




