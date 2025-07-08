const router = require('express').Router()
const {addsubAdmin,getAllSubadmin,deleteAdmin,getAdminById,updateAdmin} = require('../../controllers/admin/subadmin')
const {isAuthenticated } = require('../../middlewares')

router.post('/register',isAuthenticated,addsubAdmin)
router.post('/updateadmin',isAuthenticated,updateAdmin)
router.post('/getAllSubadmin',isAuthenticated,getAllSubadmin)
router.post('/getAdminById',isAuthenticated,getAdminById)
router.delete('/:id',isAuthenticated,deleteAdmin);



module.exports = router