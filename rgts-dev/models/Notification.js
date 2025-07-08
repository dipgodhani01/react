const mongoose = require("mongoose");
const {table} = require('../config/tables')

const {utcTime} = require('../utils/time');


// Create SCHEMA
const NotificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },

    body: {
      type: String,
      required: [true, "body is required"],
      trim: true,
    },
    type: {
        type: String,
        required: [true, "type is required"], // Appoiment, appoiment-reschedule , post-like, post-comment, admin
        trim: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    isDeleted:{
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        required: true,
        enum: ["read", "unread","sent","pending","send"],
        default: "unread"
    },
    notifyFor:{
      type: Number,
      default:3  // Venters = 1 , Listeners = 2, other = 3
    },
    users:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
      }
    ],
    date:{
      type: String,
    },
    usersRead:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    createdAt: {type: String, default: utcTime},
    updatedAt: {type: String, default: utcTime}
    
  } 
);

// Create Model
const Notification = mongoose.model(table.notification, NotificationSchema);
module.exports = Notification;

