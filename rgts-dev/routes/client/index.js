// File: routes/admin/index.js
const router = require('express').Router()
const userRouters = require('./user')
// Use sub-routes
router.use('/user', userRouters)


module.exports = router;
