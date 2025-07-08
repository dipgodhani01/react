const router = require('express').Router()
const {
    createBanner,
    getAllBanners,
    getBannerById,
    updateBanner,
    deleteBanner
} = require('../../controllers/admin/Banner');
const {isAuthenticated } = require('../../middlewares')
const validation = require('../../middlewares/validate');
const {bannerSchema} = require('../../validations/bannerValidator');

const multer = require('multer');

const path = require('path');
// const storage = multer.memoryStorage();
// const upload = multer({storage: storage});

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {         
//         let minetype = file.mimetype;
//         let res = minetype.split("/");
//         cb(null, 'uploads/slider/')
//     },
//     filename: function (req, file, cb) {
//         var ext = path.extname(file.originalname)
//         cb(null, file.fieldname + '-' + Date.now() + ext)
//     }
// });
// var upload = multer({storage:storage});

const storage = multer.memoryStorage();
const upload = multer({
storage: storage,
limits: { fileSize: 10 * 1024 * 1024 }  // 10MB limit
});

// Create a new banner
router.post('/addBanner', isAuthenticated,upload.single('image'),createBanner);
router.post('/getAllBanners', isAuthenticated,getAllBanners);
router.get('/banners/:id', isAuthenticated,getBannerById);
router.post('/update/:id', isAuthenticated,upload.single('image'),updateBanner);
router.post('/delete/:id',isAuthenticated,deleteBanner);

module.exports = router;




