const { notifyAndroid,notify } = require('../../utils/notification')
const {sendNotificationAndroiod,sendNotificationIos} = require('../../utils/notification')
const {handleError,handleSuccess} = require('../../utils/helper')
const mongoose = require('mongoose');
const User = require('../../models/User');
const Notification = require('../../models/Notification')

var moment = require('moment-timezone');
var utcTime = moment.utc().format("MM-DD-YYYY HH:mm:ss");

exports.getNotification = async (req,res)=>{
  try {
    const {id} = req.body;
    var page = req.body.page || 1
    var limit = req.body.limit || 1000
    limit = limit * 1;
    var skip = (page - 1) * limit;

    var count  = await Notification.countDocuments({notifyFor: { $in: [1, 2, 3] },type: 'admin'});
    var notificatio  = await Notification.find({notifyFor: { $in: [1, 2, 3] },type: 'admin'}).sort({_id:-1}).skip(skip).limit(limit);
    res.json({status:true,message:"Record has bean fetched successfully.",
    data:notificatio,
    size: notificatio.length,
    totalPages: Math.ceil(count / limit),
    currentPage: Number(page)
    })                                 
  } catch (err) {
    handleError(res,err);
  }
}

exports.addNotification = async (req,res)=>{
  try {
    const {title,body,date,notifyFor,selectedUsers} = req.body;
    
    if(title=='' || typeof(title)==='undefined' || body=='' || typeof(body)==='undefined'){   
      res.json({status:false,message:"All field is required",data:{}});                    
    }else{      
      let notificationType = 'admin';
      let status = (date) ? "pending" : "send";
      if (selectedUsers.length > 0 && notifyFor!==3) {
        const ids = selectedUsers.map(user => user.value);
        const  notiObj = {
          title:title,
          body:body,
          date:date || utcTime,
          notifyFor:notifyFor || 3,
          type:"admin",
          users:ids,
          status:status
        } 
        let doc = await Notification.create(notiObj);
        var  fcmtitle = title;
        var fcmBody = body;  
        
        if(date== null || typeof(date) == undefined){
          const ids = selectedUsers.map(user => mongoose.Types.ObjectId(user.value));
          let userType = (notifyFor == 1) ? "User":"Listener";
          let users = await  User.find({ _id: { $in: ids },userType:userType },'userType firebaseToken deviceType');

          if(users.length>0){
            users.map(user=>{
                let token = user.firebaseToken;
                let deviceType = user.deviceType;
                if(deviceType == 'android'){
                  sendNotificationAndroiod(fcmtitle,fcmBody,notificationType,token);
                }else{  
                  sendNotificationIos(fcmtitle,fcmBody,notificationType,token);
                }
            })
          }
        }        
        handleSuccess(res,doc,"Notification has added successfully");
      }else{
        const  notiObj = {
          title:title,
          body:body,
          date:date || utcTime,
          notifyFor:notifyFor || 3,
          type:"admin",
          status:status
        } 
        let doc = await Notification.create(notiObj);
        var  fcmtitle = title;
        var fcmBody = body;  
        if(date== null || typeof(date) == undefined){
          if(notifyFor == 1){
            notify(fcmtitle,fcmBody,notificationType,"AllVentersIOS");
            notifyAndroid(fcmtitle,fcmBody,notificationType,"AllVenters");
          }else if(notifyFor == 2){
            notify(fcmtitle,fcmBody,notificationType,"AllListenersIOS");
            notifyAndroid(fcmtitle,fcmBody,notificationType,"AllListeners");
          }else{
            notify(fcmtitle,fcmBody,notificationType,"AllVentersIOS");
            notify(fcmtitle,fcmBody,notificationType,"AllListenersIOS");
  
            notifyAndroid(fcmtitle,fcmBody,notificationType,"AllVenters");
            notifyAndroid(fcmtitle,fcmBody,notificationType,"AllListeners");
          }
        } 
        handleSuccess(res,doc,"Notification has added successfully");
      }                              
    }    
  } catch (err) {
    handleError(res,err);
  }
}

exports.notficationSend = async (req,res)=>{
    try {
      const currentUTCDate = new Date();
      currentUTCDate.setSeconds(0, 0);
      const matchcritarea = {
        status: "pending" ,
        notifyFor: { $in: [1, 2, 3] },
        $or: [
          { date: currentUTCDate}, // Match within a specific date range
          { date: currentUTCDate.toISOString() } // Or match specific ISO date string
        ]
      };
      var notification  = await Notification.findOne(matchcritarea).sort({_id:1});
      if(notification){
        const filter = { _id:notification._id};
        const update = { "$set": {status:true} };
        let doc = await Notification.updateOne(filter, update);
        const fcmtitle = notification.title;
        const fcmBody = notification.body;
        const notificationType = "admin";

        if(notification.notifyFor == 1){
          notify(fcmtitle,fcmBody,notificationType,"AllVentersIOS");
          notifyAndroid(fcmtitle,fcmBody,notificationType,"AllVenters");
        }else if(notification.notifyFor == 2){
          notify(fcmtitle,fcmBody,notificationType,"AllListenersIOS");
          notifyAndroid(fcmtitle,fcmBody,notificationType,"AllListeners");
        }else{
          notify(fcmtitle,fcmBody,notificationType,"AllVentersIOS");
          notify(fcmtitle,fcmBody,notificationType,"AllListenersIOS");

          notifyAndroid(fcmtitle,fcmBody,notificationType,"AllVenters");
          notifyAndroid(fcmtitle,fcmBody,notificationType,"AllListeners");
        }
      }    
    } catch (err) {
      handleError(res,err);
    }
}


exports.deleteAllUser = async (req,res)=>{
  try {
    const result = await User.delete({ userType: 'User' }).limit(10);
    console.log(`Deleted ${result} users.`);
  } catch (err) {
    console.log(err);
  }
}