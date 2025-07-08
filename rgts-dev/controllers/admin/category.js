const Category = require('../../models/Category')
const {image_types } = require("../../config")
const {SUCCESS,CLIENT_ERROR } = require("../../config/responseCodes")


const { logger } = require('../../utils')


exports.addCategory = async (req,res)=>{
    try {
        const {name} = req.body;
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
              const  categoryObj = {
                name:name,
                image:req.file.path
              } 
              let doc = await Category.create(categoryObj);
              res.status(SUCCESS).json({status:true,message:"Category has added successfully.",data:doc})                                 
          }    
        }    
    } catch (err) {
        return res.status(CLIENT_ERROR).json(err)
    }
}

exports.getAllCategory = async (req,res)=>{
  try {
      const doc = await Category.find();
    res.json({status:true,message:"Record has been fetched successfully.",data:doc}) 
  } catch (err) {
    res.status(CLIENT_ERROR).json(err)
  }
}

// @desc Get a Single Category
exports.getCategory = async (req,res)=>{
  try {
      const doc = await Category.findById(req.params.id);
      return res.status(SUCCESS).json({status:true,message:"Category has been fetched succesfully.",data:doc}) 
  } catch (err) {
      return res.status(CLIENT_ERROR).json({status:false,message:err,data:{}})
  }            
};

// @desc update Category
exports.updateCategory = async (req,res)=>{
    const categoryId = req.params.id;
   
  try {
      const {name,status} = req.body;
      if(typeof req.file == 'undefined'){
       
       const filter = { _id:categoryId};
        const update = { "$set": { name:name,status:status} };
        await Category.updateOne(filter, update); 
        const doc = await Category.findById(req.params.id);
        res.json({status:true,message:"Category has updated successfully.",data:doc}) 
      }else{
        if(image_types.indexOf(req.file.mimetype) == -1){               
            fs.unlink(req.file.path,function(error){
              if(error){
                return res.status(400).json(error)
              }else{  
                res.json({status:false,message:"Supported image formats: jpeg, jpg, jpe, png",data:{}})
              }
            });                                     
        }else{     

            const filter = { _id:req.params.id};
            const update = { "$set": { name:name,status:status,image:req.file.path} };
            await Category.updateOne(filter, update); 
            const doc = await Category.findById(req.params.id);

            res.json({status:true,message:"Category has update successfully.",data:doc})                                 
        }    
      }    
  } catch (err) {
      return res.status(CLIENT_ERROR).json(err.message)
  }
}


//   // @desc Delete Category
exports.deleteCatgory = async (req,res)=>{
  try {
      const doc = await Category.findById(req.params.id);
      if (!doc) {
          return res.status(400).json({status:false,message:`No category for this id ${req.params.id}`,data:{}})
      }
      //remove image 
      
      //delete category
     // await Category.findByIdAndDelete(req.params.id);
      return res.status(200).json({status:true,message:"category has been deleted succesfully.",data:{}}) 
  } catch (err) {
      return res.status(400).json({status:false,message:err,data:{}})
  }
};