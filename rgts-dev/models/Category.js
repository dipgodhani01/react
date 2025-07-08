const mongoose = require('mongoose')
const {Schema} = mongoose;
const {table} = require('../config/tables')
const {utcTime} = require('../utils/time');


const CategorySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default:true
    },

    order:{
        type: Number,
        default:1
    },
    createdAt: {type: String, default: utcTime},
    updatedAt: {type: String, default: utcTime}
})

module.exports = mongoose.model(table.categories, CategorySchema);