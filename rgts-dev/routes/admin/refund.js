const router = require('express').Router()
const {getAllRefund} = require('../../controllers/admin/Refund')
const {isAuthenticated } = require('../../middlewares')

router.post('/getAllRefund',isAuthenticated,getAllRefund)
module.exports = router