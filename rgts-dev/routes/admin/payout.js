const router = require('express').Router()
const {getPendingPayout} = require('../../controllers/admin/Payout')
const {isAuthenticated } = require('../../middlewares')

router.post('/pendingPayout',isAuthenticated,getPendingPayout)
module.exports = router