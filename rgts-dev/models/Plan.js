const mongoose = require("mongoose");
const {Schema} = mongoose;
const {table} = require('../config/tables')
const {utcTime} = require('../utils/time');

// Create SCHEMA
const PlanSchema = new mongoose.Schema(
{
    title:{type: String, default: ''}, 
    amount:{type: Number,default: 0},    
    duration:{type: Number,default: ""},
    durationDataType:{type: String,default: "Day"}, //year, month, day, hour, minute, and second
    minutes:{type: Number,default: ""},       
    tage:{type: String,default: ""},
    status: {type: String,required: true,
        enum: ["Active", "Inactive"],
        default: "Active"
    },
    isDeleted:{type: Boolean,default: false}, 
    vents:{type: Number,default: 0},   // 1 vents = 10 minutes
    createdAt: {type: String, default: utcTime},
    updatedAt: {type: String, default: utcTime}
    
  } 
);
// Create Model
const Plan = mongoose.model(table.plan, PlanSchema);
module.exports = Plan;
