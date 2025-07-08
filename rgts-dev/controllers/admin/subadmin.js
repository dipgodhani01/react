
const User = require('../../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require("fs")
const AWS = require("aws-sdk");
const mongoose = require('mongoose');

const {userFindById} = require("../../services/userService");

const {SUCCESS,CLIENT_ERROR } = require("../../config/responseCodes")

exports.addsubAdmin = async (req, res) => {
  try {
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt); 
      const {email,username,mobile,gender,bio} = req.body; 
      const checkEmail= await User.find({email:email});  

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(SUCCESS).json({ status: false, message: "Invalid email format.", data: {} });
      }

      if((/\s/).test(username)){
         return res.status(SUCCESS).json({status:false,message:"Username should not allowed with space.",data:{}}) 
      }


      if(checkEmail.length > 0){
        return res.status(SUCCESS).json({status:false,message:"Email is already exist.",data:{}}) 
      }

      const checkUsername= await User.find({username:username});
      if(checkUsername.length>0){
        return res.status(SUCCESS).json({status:false,message:"Username is already exist.",data:{}}) 
      }

      const checkMobile= await User.find({mobile:mobile});
      if(checkMobile.length>0){
        console.log(checkMobile)
        return res.status(SUCCESS).json({status:false,message:"Mobile is already exist.",data:{}}) 
      }
      // device id empty if same device id exist
      await User.updateOne({ deviceId:req.body.deviceId}, { "$set":{deviceId:''}});

      const doc = await User.create({
        name: req.body.name,
        username: req.body.username,
        password: secPass,
        email: email,
        mobile:mobile,
        dialCode:req.body.dialCode || '',
        deviceType:'web',
        emailVerified: true,
        userType:"Subadmin"
      });
  
      const user =  await userFindById(doc._id);
      return res.status(SUCCESS).json({status:true,message:"Signup successfully.",data:user})    
  }
  catch (err) {
    return res.status(CLIENT_ERROR).json({status:false,message:err.message,data:{}})
  }
}

exports.getAllSubadmin = async (req, res) => {
  try {
    const page = parseInt(req.body.page) || 1;
    const limit = parseInt(req.body.limit) || 10;
    const skip = (page - 1) * limit;

    // Only get Subadmins
    const query = { userType: "Subadmin", isDeleted: false };

    // Fetch Subadmins with pagination
    let users = await User.find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    let data = [];

    for (const user of users) {
      data.push({
        _id: user._id,
        image: user.image,
        gender: user.gender,
        userType: user.userType,
        name: user.name,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        dob: user.dob,
        dialCode: user.dialCode || "",
        category: user.category || [],
        bio: user.bio || "",
        video: user.video || "",
        videoDenyReason: user.videoDenyReason || "",
        videoApproved: user.videoApproved || "Pending",
        status: user.status,
        isDeleted: user.isDeleted,
        inhouse_listener: user.inhouse_listener || false,
        createdAt: user.createdAt,
      });
    }
    return res.json({
      status: true,
      message: "Record has been fetched successfully.",
      data: data,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ status: false, message: err.message, data: {} });
  }
};

exports.deleteAdmin = async(req,res)=>{
  try {
    const doc = await User.findById(req.params.id);
    if (!doc) {
        return res.status(400).json({status:false,message:`No admin for this id ${req.params.id}`,data:{}})
    }
        //delete admin
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({status:true,message:"Admin has been deleted succesfully.",data:{}}) 
    } catch (err) {
        return res.status(400).json({status:false,message:err,data:{}})
    }

}

exports.getAdminById = async(req,res)=>{
    try {
        const {adminId} = req.body; 
      const doc = await User.findById(adminId);
          return res.status(200).json({status:true,message:"Admin has been deleted succesfully.",data:doc}) 
      } catch (err) {
          return res.status(400).json({status:false,message:err,data:{}})
      }
}

exports.updateAdmin = async (req, res) => {
    try {
      const { adminId, email, username, mobile, name, password, dialCode } = req.body;

      if (!mongoose.Types.ObjectId.isValid(adminId)) {
        return res.status(SUCCESS).json({ status: false, message: "Invalid admin ID", data: {} });
      }

      const admin = await User.findOne({ _id: adminId, userType: 'Subadmin' });
      if (!admin) {
        return res.status(SUCCESS).json({ status: false, message: "Subadmin not found.", data: {} });
      }
  
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email)) {
        return res.status(SUCCESS).json({ status: false, message: "Invalid email format.", data: {} });
      }
  
      // Username cannot contain spaces
      if (username && (/\s/).test(username)) {
        return res.status(SUCCESS).json({ status: false, message: "Username should not contain spaces.", data: {} });
      }
  
      // Check uniqueness (excluding current admin)
      const existingEmail = await User.findOne({ email, _id: { $ne: adminId } });
      if (existingEmail) {
        return res.status(SUCCESS).json({ status: false, message: "Email already exists.", data: {} });
      }
  
      const existingUsername = await User.findOne({ username, _id: { $ne: adminId } });
      if (existingUsername) {
        return res.status(SUCCESS).json({ status: false, message: "Username already exists.", data: {} });
      }
  
      const existingMobile = await User.findOne({ mobile, _id: { $ne: adminId } });
      if (existingMobile) {
        return res.status(SUCCESS).json({ status: false, message: "Mobile number already exists.", data: {} });
      }
  
      const updateFields = {
        name,
        username,
        email,
        mobile,
        dialCode: dialCode || '',
      };
  
      if (password) {
        const salt = await bcrypt.genSalt(10);
        updateFields.password = await bcrypt.hash(password, salt);
      }
  
      await User.updateOne({ _id: adminId }, { $set: updateFields });
  
      const updatedUser = await userFindById(adminId);
  
      return res.status(SUCCESS).json({
        status: true,
        message: "Admin has been updated successfully.",
        data: updatedUser,
      });
  
    } catch (err) {
      return res.status(CLIENT_ERROR).json({
        status: false,
        message: err.message,
        data: {},
      });
    }
  };

  



