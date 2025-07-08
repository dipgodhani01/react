const mongoose = require('mongoose');
const {Schema} = mongoose;
const {table} = require('../config/tables');
const {utcTime} = require('../utils/time');


const FeedBackSchema = new Schema({
    message:{
        type: String,
        trim: true,
        required:true,
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    status:{
        type: Boolean,
        default:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: [true, "User id is required"],
    },
    createdAt: {type: String, default: utcTime},
    updatedAt: {type: String, default: utcTime}
})

module.exports = mongoose.model(table.feedback, FeedBackSchema);