const mongoose = require("mongoose");
const {table} = require('../config/tables')

const {utcTime} = require('../utils/time');
const { date } = require("yup");

// Create SCHEMA
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      required: [true, "post description is required"],
      trim: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Author is required"],
    },
    numViews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],

    disLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    favorite: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    savePost: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    mood: {
        type: String,
    },
    isDeleted:{
        type: Boolean,
        default: false,
    },
    
    status: {
        type: String,
        required: true,
        enum: ["Active", "Block"],
        default: "Active"
    },
    report:{
      type: String,
    },
    createdAt: {type:String, default: utcTime},
    updatedAt: {type:String, default: utcTime}
    
  } 
);


// Create Model
const Post = mongoose.model(table.feed, PostSchema);
module.exports = Post;

