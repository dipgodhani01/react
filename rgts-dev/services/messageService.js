const { default: mongoose, Mongoose } = require("mongoose");
const Message = require("../models/Message");
const Chatconnect = require("../models/ChatConnect");
const { io } = require("../utils/socket");
const { sendNotification,sendNotificationIos,sendNotificationAndroiod} = require('../utils/notification');
const { chat_details_activity_click_action } = require("../config/clickAction");
const {handleSuccess,handleError} = require('../utils/helper');



//For create group
const createGroupService = async (toId, fromId) => {
  c("create group function called")
  try {
    const result = await Chatconnect.findOne({
      connectPeopleId: { $all: [...toId, fromId] },
    });
    if (result) {
      return {
        status: true,
        message: "",
        data: { message: "Group already exist" },
      };
    } else {
      let list = [...toId];
      list.push(fromId);
      const chatData = new Chatconnect({
        connectPeopleId: list,
      });
      const chatSaveData = await chatData.save();
      return {
        status: true,
        message: "",
        data: chatSaveData,
      };
    }
  } catch (error) {
    throw error;
  }
};

//If personal chat connection not exist then first create connection and then enter message
const createMessageService = async (toId, fromId, messageData) => {
  c("createMessageService function called")
  try {
    const result = await Chatconnect.findOne({
      connectPeopleId: { $all: [...toId, fromId] },
    });
    let data = {};
    if (result) {
      data = new Message({
        toId: toId, fromId: fromId, messageData: messageData,
        isReceive: false,isRead: false, chatConnectId: result._id,
      });
    } else {
      let list = [...toId];
      list.push(fromId);
      const chatData = new Chatconnect({
        connectPeopleId: list,
      });
      const chatSaveData = await chatData.save();

      data = new Message({
        toId: toId, fromId: fromId,messageData: messageData,
        isReceive: false,isRead: false,chatConnectId: chatSaveData._id,
      });
    }
    const saveData = await data.save();
    sendData(saveData);
  } catch (error) {
    throw error;
  }
};

//Delete message
const deleteMessageService = async (chatId) => {
  c("deleteMessageService function called")
  try {
    const data = await Message.find({ _id: chatId }).populate({path:"toId",select:"name image userType email firebaseToken"}).populate({path:"fromId",select:"name image userType email firebaseToken"}).sort( { "_id": -1 } ).limit(1);

    Message.deleteOne({ _id: chatId }, (err) => {
      if (err) {
        console.error('Error deleting document:', err);
      } else {
        console.log('Document deleted successfully');
      }
    });
    //send message for self user
    const fromRecieveMessage = data.fromId;
    io.emit(`${fromRecieveMessage}`+'_deleteMessage', JSON.stringify(data));
  
    //send message to the receiver
    data.toId.forEach((element) => {
      io.emit(`${element}`+'_deleteMessage', JSON.stringify(data));
    });
  
    var newResult = JSON.parse(JSON.stringify(data));
    newResult.data.forEach((rows)=>{
      rows.toId.forEach(function(childrenEntry) { 
        var  fcmtitle = childrenEntry.name;
        var fcmBody = "chat message deletes";  
        var notificationType = 'delete-chat-notification';
        var token = childrenEntry.firebaseToken;
        var receiver = childrenEntry._id;
        var sender = data.fromId;
        sendNotification(fcmtitle,fcmBody,notificationType,token,receiver,sender); 
      });
    })
  
  } catch (error) {
    throw error;
  }
};



//If personal chat connection not exist then first create connection and then enter message
const chatConnectsService = async (toId, fromId, messageData) => {
  console.log('chatConnectsService function service called')
  try {
    const result = await Chatconnect.findOne({
      connectPeopleId: { $all: [...toId, fromId] },
    });
    let data = {};
    if (result) {
      //c('chat connection exist')
    }else{
      let list = [...toId];
      list.push(fromId);
      const chatData = new Chatconnect({
        connectPeopleId: list,
      });
      const chatSaveData = await chatData.save();
      //console.log('chat connecttion created')
    } 
  } catch (error) {
    throw error;
  }
};

//send message to the receiver through socket
const sendData = async (data) => {
  console.log('sendData function service called')
  var message = data.messageData
  const result = await getMessageService(data.chatConnectId);
  //send message for self user
  const fromRecieveMessage = data.fromId;
  io.emit(`${fromRecieveMessage}`+'_reciveMessage', JSON.stringify(result));

  //send message to the receiver
  data.toId.forEach((element) => {
    console.log('_sendMessage',`${element}`)
    io.emit(`${element}`, JSON.stringify(result));
  });

  var newResult = JSON.parse(JSON.stringify(result));
  newResult.data.forEach((rows)=>{
    rows.toId.forEach(function(childrenEntry) { 
      var fcmtitle = rows?.fromId?.name;
      var fcmBody = message;  
      var notificationType = 'chat-notification';
      var token = childrenEntry.firebaseToken;
      var receiver = childrenEntry;
      var sender = rows.fromId;
      var click_action = chat_details_activity_click_action;
      if(childrenEntry.deviceType=="ios"){
          sendNotificationIos(fcmtitle,fcmBody,notificationType,token,receiver,sender,click_action); 
      }else{
          sendNotificationAndroiod(fcmtitle,fcmBody,notificationType,token,receiver,sender,click_action); 
      }
      //sendNotification(fcmtitle,fcmBody,notificationType,token,receiver,sender); 
    });
  })


};

//update message receive status
const receiveMessageStatusUpdateService = async (id) => {
  try {
    const data = await Message.updateOne(
      { _id: id },
      {
        $set: {
          isReceive: true,
        },
      },
      {
        new: true,
      }
    );
    return {
      status: true,
      message: "",
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

//update read status
const readMessageStatusUpdateService = async (chatId) => {
  try {
    
    const data = await Message.updateOne(
      { _id: chatId },
      { $set: {isRead: true} },
      { new: true}
    );
    console.log('status update response-->',data)
    return { status: true,message: "",data: data};
  } catch (error) {
    throw error;
  }
};

//get data on chat connection id
const getMessageService = async (id) => {
  try {
    const data = await Message.find({ chatConnectId: id }).populate({path:"toId",select:"name image userType email firebaseToken deviceType"}).populate({path:"fromId",select:"name image userType email firebaseToken deviceType"}).sort( { "_id": -1 } ).limit(1);
    return {
      status: true,
      message: "",
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

const getAllMessageService = async (toId,fromId) => {
  try{
    let data
    const chatId = await Chatconnect.find({connectPeopleId: { $all: [...toId, fromId] }},{_id:1})
   
    if(chatId){
      data = await Message.find({ chatConnectId: chatId }).populate({path:"toId",select:"name image"}).populate({path:"fromId",select:"name image"});
      //const unreadCount = await Message.countDocuments({chatConnectId:chatId,isRead: false});
    }    
    return {status: true,message: "",data: data ? data : []};
  }catch (error){
    throw error
  }
}

const getChatConnectByUserIdService = async (id) => {
  try{

    var chatData = await Chatconnect.find({connectPeopleId: { $in: [id] }}).populate({path:"connectPeopleId",select:"name image userType email"})
    chatData = JSON.parse(JSON.stringify(chatData));
    var index = 0;
    var obj = [];
    for (const data of chatData) {
      var chatConnectId = data._id;   
      const lastMessage  = await Message.findOne({chatConnectId:chatConnectId}).sort({"_id":-1}).limit(1); 

      // Count unread messages
      const unreadCount = await Message.countDocuments({chatConnectId, isRead: false,toId:{$in:[id]}});

      if(lastMessage){
        data.last_message = lastMessage;
        obj.push(data);
      }

      data.unread_count = unreadCount;
      //chatData[index].last_message = lastMessage || {};
      index++;
    }
    return {
      status: true,
      message: "",
      data: obj,
    };
  }catch (error){
    throw error
  }
}


module.exports = {
  createMessageService,
  receiveMessageStatusUpdateService,
  readMessageStatusUpdateService,
  createGroupService,
  getAllMessageService,
  getChatConnectByUserIdService,
  getMessageService,
  chatConnectsService,
  deleteMessageService
};