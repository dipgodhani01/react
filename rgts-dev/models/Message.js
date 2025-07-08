const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {table} = require('../config/tables')

const {utcTime} = require('../utils/time');


const messageSchema = mongoose.Schema(
  {
    toId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: [true, "Reciever id is required"],
      },
    ],
    fromId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Sender id is required"],
    },
    messageData: {
      type: String,
      required: [true, "Name is required"],
    },
    isReceive: {
      type: Boolean,
      required: [true, "isReceive is required"],
    },
    isRead:{
      type: Boolean,
      required: [true,"isRead is Required"]
    },
    chatConnectId:{
      type: Schema.Types.ObjectId,
      ref: "chatconnects",
      required: [true, "chat connect id is required"], 
    },
    createdAt: {type: String, default: utcTime},
    updatedAt: {type: String, default: utcTime}
  }
);

module.exports = mongoose.model(table.messages, messageSchema);
