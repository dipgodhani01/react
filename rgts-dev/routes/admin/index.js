// File: routes/admin/index.js
const router = require('express').Router()
const adminRouters = require('./admin')
// Use sub-routes
router.use('/admin', adminRouters)


module.exports = router;
