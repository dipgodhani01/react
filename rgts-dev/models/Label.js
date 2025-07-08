const mongoose = require('mongoose');
const { mixed } = require('yup');
const {Schema} = mongoose;
const {table} = require('../config/tables')

const {utcTime} = require('../utils/time');


const LabelSchema = new Schema({
    code:{
        type: String,
        trim: true,
        minlength: [3, 'Code minmun 3 or more charactour'],
        required:true,
        unique: true
    },
    title:{
        type: String,
        required: true
    },
    value:{type:Object},
    status:{
        type: Boolean,
        default:true
    },
    createdAt: {type: String, default: utcTime},
    updatedAt: {type: String, default: utcTime}
})

module.exports = mongoose.model(table.labels, LabelSchema);