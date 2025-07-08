const Banner = require('../../models/Banner');
const bannerSchema = require('../../validations/bannerValidator');
const {handleSuccess,handleError} = require('../../utils/helper');
const {image_types,bucketName,bucketRegion} = require("../../config")
const {SUCCESS,CLIENT_ERROR } = require("../../config/responseCodes")
const {uploadToS3} = require("../../utils/uploadImgToS3");




exports.createBanner = async (req, res) => {
    try {
        const {name,title,link,description} = req.body;
        if(typeof req.file == 'undefined'){
            res.json({status:false,message:"Please select Image",data:{}})
        }else{
          if(image_types.indexOf(req.file.mimetype) == -1){               
              fs.unlink(req.file.path,function(error){
                if(error){
                  return res.status(CLIENT_ERROR).json(error)
                }else{  
                  res.json({status:false,message:"Supported image formats: jpeg, jpg, jpe, png",data:{}})
                }
              });                                     
          }else{        
            
            const SliderImage  =  `slider_`+`${Date.now().toString()}.`+req.file.originalname.split('.').pop();   
            const img = await uploadToS3(req.file.buffer,bucketName+'/slider',SliderImage);
            const image = img.Location;

              const  bannerObj = {
                name:name,
                title:title,
                link:link,
                description:description,
                image:image
              } 
              let doc = await Banner.create(bannerObj);
              res.json({status:true,message:"Banner has added successfully.",data:doc})                                 
          }    
        }    
        // handleSuccess(res,banner,'Banner has been created successfully.');
    } catch (err) {
        handleError(res,err.message);
    }
};

exports.getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        handleSuccess(res,banners,'Banner has been fetched successfully.');
    } catch (err) {
        handleError(res,err.message);
    }
};

exports.getBannerById = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) handleError(res,"Banner not found");
        handleSuccess(res,banner,'Banner has been deleted successfully.');
    } catch (err) {
        handleError(res,err.message);
    }
};

exports.updateBanner = async (req, res) => {
    try {
        const {name,title,description,link,status} = req.body;
        const bannerId = req.params.id;
        let banner = await Banner.findById(bannerId);
        if(typeof req.file == 'undefined'){               
            const filter = { _id:bannerId};
            const update = { "$set": {name:name,status:status,description:description,link:link,title:title} };
            await Banner.updateOne(filter, update); 
            const doc = await Banner.findById(bannerId);
            handleSuccess(res,doc,'Banner has been updated successfully.');
        }else{
            if(image_types.indexOf(req.file.mimetype) == -1){     
                handleError(res,"Supported image formats: jpeg, jpg, jpe, png");                                                                    
            }else{     

                // banner = JSON.parse(JSON.stringify(banner));  
                // const imageUrl = banner.image;
                // const urlPrefix = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/.amazonaws.com/`;
                // const imageKey = imageUrl.replace(urlPrefix, '');
                // await deleteVideoFromS3(bucketName,imageKey);


                const SliderImage  =  `slider_`+`${Date.now().toString()}.`+req.file.originalname.split('.').pop();   
                const img = await uploadToS3(req.file.buffer,bucketName+'/slider',SliderImage);
                const image = img.Location;
    
                const filter = { _id:bannerId};
                const update = { "$set": { name:name,status:status,description:description,link:link,title:title,image:image} };
                await Banner.updateOne(filter, update); 
                const doc = await Banner.findById(bannerId);
                handleSuccess(res,doc,'Banner has been updated successfully.');                                
            }    
        }   
    } catch (err) {
        handleError(res,err.message);
    }
};

exports.deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findByIdAndDelete(req.params.id);
        if (!banner)  handleError(res,"Banner not found");
        handleSuccess(res,{},'Banner has been deleted successfully.');
    } catch (err) {
        handleError(res,err.message);
    }
};