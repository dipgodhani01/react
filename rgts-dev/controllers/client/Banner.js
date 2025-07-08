const Banner = require('../../models/Banner');
const {handleSuccess,handleError} = require('../../utils/helper');

exports.getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        handleSuccess(res,banners,'Banner has been fetched successfully.');
    } catch (err) {
        handleError(res,err.message);
    }
};
